import { Router } from "express";

import { requireAuth } from "../middleware/auth.js";
import { allow } from "../middleware/roles.js";

import {
  disable2FA,
  login,
  register,
  requestPasswordReset,
  resetPassword,
  setup2FA,
  verifyAndEnable2FA,
  verifyEmail,
  refresh,
  me,
  getUser
} from "../presenters/authPresenter.js";

const router = Router();

router.post("/register",register);
router.post("/verify-email/:token", (req, res, next) => {
  if (req.headers["purpose"] === "prefetch") {
    console.log("⚠️ Prefetch request blocked");
    return res.status(204).end();
  }
  next();
});
router.post("/verify-email/:token", verifyEmail);
router.get('/user',requireAuth,getUser)

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", (_, res) => res.json({ ok: true }));

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.get("/me", requireAuth, me);

router.post("/2fa/setup", requireAuth, setup2FA);
router.post("/2fa/verify", requireAuth, verifyAndEnable2FA);
router.post("/2fa/disable", requireAuth, disable2FA);

router.get("/admin", requireAuth, allow("admin"), (req, res) =>
  res.json({ message: "Admin access granted" })
);

export default router;


