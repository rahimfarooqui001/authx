


import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

import { success, failure } from "../views/responses.js";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  hashToken,
} from "../utils/token.js";

import { sendMail } from "../utils/mail.js";
import {
  generateTOTPSecret,
  generateQRCodeDataURL,
  verifyTOTP,
} from "../utils/otp.js";
import { generateRecoveryCodes, verifyRecoveryCode } from "../utils/recovery.js";
import VerificationToken from "../models/VerificationToken.js";


const SALT_ROUNDS = Number(process.env.SALT_ROUNDS );
const APP_BASE = process.env.APP_BASE_URL ;
const FRONTEND_URL = process.env.FRONTEND_URL;

const makeTokenString = () => crypto.randomBytes(32).toString("hex");

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  emailVerified: user.isVerified,
  twoFAEnabled: user.twoFA?.enabled || false,
});



export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return failure(res, "Email already registered", 409);

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash, role, isVerified: false });

    const token = makeTokenString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await VerificationToken.create({ user: user._id, token, expiresAt });

    const verifyUrl = `${FRONTEND_URL}/verify-email/${token}`;

    const html = `
      <p>Hi ${user.name},</p>
      <p>Please verify your email to activate your account:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `;

    sendMail({
      to: user.email,
      subject: "Verify your AuthX account",
      html,
    }).catch(err => console.error("Email send error:", err));

    return success(
      res,
      {
        message: "Account created. Please check your email to verify your account.",
        user: formatUser(user),
      },
      201
    );

  } catch (err) {
    return failure(res, err.message, 500);
  }
};



export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

  

    const record = await VerificationToken.findOne({ token });
   

    if (!record) {
     
      return failure(res, "Invalid or expired token", 400);
    }

    const user = await User.findById(record.user);
 

    if (!user) {
    
      return failure(res, "User not found", 404);
    }

   
    user.isVerified = true;
    await user.save();

    

    const deleted = await VerificationToken.deleteOne({ _id: record._id });
 
    return success(res, "Email verified. You can now login.");

  } catch (err) {
   
    return failure(res, err.message, 500);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, twoFAToken, recoveryCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) return failure(res, "Invalid credentials", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return failure(res, "Invalid credentials", 401);

    if (!user.isVerified)
      return failure(res, "Please verify your email before login", 403);

    
    if (user.twoFA?.enabled) {
      if (!twoFAToken && !recoveryCode) {
        return success(res, {
          twoFARequired: true,
          message: "Two-factor authentication required",
        });
      }

      let valid2FA = false;
      let errorMessage = "";

      if (twoFAToken) {
        valid2FA = verifyTOTP(user.twoFA.secret, twoFAToken);
        if (!valid2FA) errorMessage = "Invalid 2FA code";
      } else if (recoveryCode) {
        const result = verifyRecoveryCode(user.twoFA.recoveryCodes, recoveryCode);
        valid2FA = result.valid;
        errorMessage = result.message;

        if (valid2FA) {
          result.codeObj.used = true;
          result.codeObj.usedAt = new Date();
          await user.save();
        }
      }

      if (!valid2FA) {
        return failure(res, errorMessage, 401);
      }
    }

   
    const access = createAccessToken(user);
    const refresh = await createRefreshToken(req, user);


    return success(res, {
      message: "Login successful",
      access,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.isVerified,
        twoFAEnabled: user.twoFA?.enabled || false,
      },
    });

  } catch (err) {
    return failure(res, err.message, 500);
  }
};


export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return failure(res, "Refresh token missing", 401);

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      return failure(res, "Invalid or expired refresh token", 401);
    }

    const hashedToken = hashToken(token);
    const stored = await RefreshToken.findOne({ token: hashedToken });
    if (!stored) return failure(res, "Refresh token revoked", 401);

    const user = await User.findById(payload.sub);
    if (!user) {
      await revokeRefreshToken(token);
      return failure(res, "User not found", 404);
    }

    const access = createAccessToken(user);

    return success(res, { access });

  } catch (err) {
    return failure(res, err.message, 500);
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -twoFA.secret"
    );
    if (!user) return failure(res, "User not found", 404);

    return success(res, formatUser(user));
  } catch (err) {
    return failure(res, err.message, 500);
  }
};

export const me=async(req,res)=>{

}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return failure(res, "Email required", 400);

    const user = await User.findOne({ email });

    if (!user) return success(res, "If account exists, an email has been sent");

    const token = makeTokenString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await PasswordResetToken.create({ user: user._id, token, expiresAt });

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    const html = `
      <p>Hi ${user.name},</p>
      <p>Reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `;

    await sendMail({ to: user.email, subject: "Reset your password", html });

    return success(res, "If account exists, an email has been sent");
  } catch (err) {
    return failure(res, err.message, 500);
  }
};


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
      secret: secret.base32,
    });
  } catch (err) {
    return failure(res, err.message, 500);
  }
};



export const verifyAndEnable2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || !user.twoFA?.secret)
      return failure(res, "2FA not setup", 400);

    const ok = verifyTOTP(user.twoFA.secret, token);
    if (!ok) return failure(res, "Invalid 2FA code", 401);

    user.twoFA.enabled = true;

    const { plainCodes, hashedCodes } = generateRecoveryCodes(10);

    if (!Array.isArray(hashedCodes))
      return failure(res, "Failed to generate recovery codes", 500);

    user.twoFA.recoveryCodes = hashedCodes.map(code => ({
      code,
      used: false,
      usedAt: null
    }));

    await user.save();

    return success(res, {
      message: "2FA enabled",
      recoveryCodes: plainCodes,
      twoFAEnabled: true
    });
  } catch (err) {
    return failure(res, err.message, 500);
  }
};





export const disable2FA = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return failure(res, "User not found", 404);

    if (!user.twoFA?.enabled)
      return failure(res, "2FA is not enabled", 400);

    let passwordOK = false;
    let totpOK = false;

    if (password) passwordOK = await bcrypt.compare(password, user.password);
    if (token) totpOK = verifyTOTP(user.twoFA.secret, token);

    if (!passwordOK && !totpOK)
      return failure(res, "Password or 2FA code invalid", 401);

    user.twoFA = { enabled: false, secret: null, recoveryCodes: [] };
    await user.save();

    return success(res, {
      message: "Two-Factor Authentication disabled",
      twoFAEnabled: false
    });
  } catch (err) {
    return failure(res, err.message, 500);
  }
};




export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      const hashedToken = hashToken(token);
      await RefreshToken.deleteOne({ token: hashedToken });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 0,
    });

    return success(res, { message: "Logged out successfully" });
  } catch (err) {
    return failure(res, err.message, 500);
  }
};