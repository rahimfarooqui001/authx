

import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};


export const createAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1m" }
  );
};


export const createRefreshToken = async (req, user) => {
  const token = jwt.sign(
    { sub: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const hashedToken = hashToken(token);

  await RefreshToken.create({
    user: user._id,
    token: hashedToken,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  });

  req.res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    path:"/",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return token;
};


export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET); 
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};



export const revokeRefreshToken = async (token) => {
  const hashedToken = hashToken(token);
  await RefreshToken.deleteOne({ token: hashedToken });
};


export const cleanupExpiredTokens = async () => {
  await RefreshToken.deleteMany({ expiresAt: { $lt: new Date() } });
};
