import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export const createAccessToken = (user) =>
  jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

export const createRefreshToken = async (req, user) => {
  const token = jwt.sign(
    { sub: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await RefreshToken.create({
    user: user._id,
    token,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return token;
};

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export const revokeRefreshToken = async (token) => {
  await RefreshToken.deleteOne({ token });
};

