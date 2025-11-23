# Email verification example

When a user registers a verification email is sent.

Example verification URL:
GET /api/auth/verify-email/:token

Example of email attachment used in register (demo):
/mnt/data/Resume_Mohammed Rahimuddin Farooqui.pdf

# Password reset
POST /api/auth/request-password-reset { email }
Then click link in received email (open in browser) or send token to:
POST /api/auth/reset-password { token, newPassword }

# 2FA
POST /api/auth/2fa/setup (requires Authorization header)
-> returns qrDataUrl (data:image/png;base64,...) and secret
Scan the QR with Google Authenticator or Authy.
POST /api/auth/2fa/verify { token } (to enable)
