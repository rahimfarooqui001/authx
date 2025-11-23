import { failure } from "../views/responses.js";

export const allow = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return failure(res, "Forbidden", 403);
  next();
};
