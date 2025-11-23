import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import VerificationToken from "../models/VerificationToken.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

import { success, failure } from "../views/responses.js";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from "../utils/token.js";

import { sendMail } from "../utils/mail.js";
import { generateTOTPSecret, generateQRCodeDataURL, verifyTOTP } from "../utils/otp.js";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 12);
const APP_BASE = process.env.APP_BASE_URL || "http://localhost:5000";

const makeTokenString = () => crypto.randomBytes(32).toString("hex");

//
// ─── REGISTER ────────────────────────────────────────────────────────────────
//
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // console.log(req.body,'boddyyyy')

  
    const exists = await User.findOne({ email });
    if (exists) return failure(res, "Email already registered", 409);

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash, role });

    // create email verification token
    const token = makeTokenString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    await VerificationToken.create({ user: user._id, token, expiresAt });

    // email link
    const verifyUrl = `${APP_BASE}/api/auth/verify-email/${token}`;

    const html = `
      <p>Hi ${user.name},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>If you didn't create an account, ignore this email.</p>
    `;

    await sendMail({
      to: user.email,
      subject: "Verify your AuthX account",
      html
    });

    const access = createAccessToken(user);
    const refresh = await createRefreshToken(req, user);

    return success(
      res,
      {
        user: { id: user._id, email: user.email, isVerified: user.isVerified },
        access,
        refresh,
      },
      201
    );
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── VERIFY EMAIL ───────────────────────────────────────────────────────────
//
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const record = await VerificationToken.findOne({ token });
    if (!record) return failure(res, "Invalid or expired token", 400);

    const user = await User.findById(record.user);
    if (!user) return failure(res, "User not found", 404);

    user.isVerified = true;
    await user.save();

    await VerificationToken.deleteOne({ _id: record._id });

    return success(res, "Email verified. You can now login.");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── LOGIN ─────────────────────────────────────────────────────────────────
//
export const login = async (req, res) => {
  try {
    const { email, password, twoFAToken } = req.body;

    const user = await User.findOne({ email });
    if (!user) return failure(res, "Invalid credentials", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return failure(res, "Invalid credentials", 401);

    if (!user.isVerified) return failure(res, "Please verify your email before login", 403);

    // user has enabled 2FA → must verify TOTP token
    if (user.twoFA?.enabled) {
      if (!twoFAToken) {
        return success(res, { twoFARequired: true, message: "2FA required" });
      }

      const ok = verifyTOTP(user.twoFA.secret, twoFAToken);
      if (!ok) return failure(res, "Invalid 2FA code", 401);
    }

    const access = createAccessToken(user);
    const refresh = await createRefreshToken(req, user);

    return success(res, {
      user: { id: user._id, email: user.email, role: user.role },
      access,
      refresh
    });
  } catch (err) {
    return failure(res, err.message , 500);
  }
};

//
// ─── REFRESH TOKEN ─────────────────────────────────────────────────────────
//
export const refresh = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return failure(res, "Refresh token required", 400);

    const payload = verifyRefreshToken(token);
    const stored = await RefreshToken.findOne({ token });

    if (!stored) return failure(res, "Refresh expired or revoked", 401);

    await revokeRefreshToken(token);

    const user = await User.findById(payload.sub);
    const access = createAccessToken(user);
    const newRefresh = await createRefreshToken(req, user);

    return success(res, { access, refresh: newRefresh });
  } catch (err) {
    return failure(res, err.message, 401);
  }
};

//
// ─── GET CURRENT USER ──────────────────────────────────────────────────────
//
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -twoFA.secret");
    if (!user) return failure(res, "User not found", 404);

    return success(res, user);
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── REQUEST PASSWORD RESET ───────────────────────────────────────────────
//
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return failure(res, "Email required", 400);

    const user = await User.findOne({ email });

    // DO NOT reveal whether user exists
    if (!user) return success(res, "If account exists, an email has been sent");

    const token = makeTokenString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordResetToken.create({ user: user._id, token, expiresAt });

    const resetUrl = `${APP_BASE}/api/auth/reset-password?token=${token}`;

    const html = `
      <p>Hi ${user.name},</p>
      <p>Click to reset your password (valid 1 hour):</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `;

    await sendMail({ to: user.email, subject: "Reset your password", html });

    return success(res, "If account exists, an email has been sent");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── RESET PASSWORD ───────────────────────────────────────────────────────
//
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return failure(res, "Token and new password required", 400);

    const record = await PasswordResetToken.findOne({ token });
    if (!record) return failure(res, "Invalid or expired token", 400);

    const user = await User.findById(record.user);
    if (!user) return failure(res, "User not found", 404);

    const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hash;
    await user.save();

    await PasswordResetToken.deleteOne({ _id: record._id });

    return success(res, "Password reset successful");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── SETUP 2FA ─────────────────────────────────────────────────────────────
//
export const setup2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return failure(res, "User not found", 404);

    const secret = generateTOTPSecret(user.email);
    const qrDataUrl = await generateQRCodeDataURL(secret.otpauth_url);

    user.twoFA = { enabled: false, secret: secret.base32 };
    await user.save();

    return success(res, {
      qrDataUrl,
      secret: secret.base32
    });
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── VERIFY & ENABLE 2FA ───────────────────────────────────────────────────
//
export const verifyAndEnable2FA = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findById(req.user.id);
    if (!user || !user.twoFA?.secret)
      return failure(res, "2FA not setup", 400);

    const ok = verifyTOTP(user.twoFA.secret, token);
    if (!ok) return failure(res, "Invalid 2FA code", 401);

    user.twoFA.enabled = true;
    await user.save();

    return success(res, "2FA enabled");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

//
// ─── DISABLE 2FA ───────────────────────────────────────────────────────────
//
export const disable2FA = async (req, res) => {
  try {
    const { token, password } = req.body;
    console.log(req.body)
    const user = await User.findById(req.user.id);

    if (!user) return failure(res, "User not found", 404);

    let ok = false;

    if (password) {
      ok = await bcrypt.compare(password, user.password);
    } else if (token) {
      ok = verifyTOTP(user.twoFA.secret, token);
    }

    if (!ok) return failure(res, "Verification failed", 401);

    user.twoFA = { enabled: false, secret: null };
    await user.save();

    return success(res, "2FA disabled");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};


