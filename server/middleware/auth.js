import jwt from "jsonwebtoken";
import { failure } from "../views/responses.js";



export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer "))
    return failure(res, "No token provided", 401);
  
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return failure(res, "Invalid/Expired token", 401);
  }
};

