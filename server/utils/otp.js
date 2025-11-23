import speakeasy from "speakeasy";
import qrcode from "qrcode";

export const generateTOTPSecret = (userEmail) => {
  const secret = speakeasy.generateSecret({
    name: `${process.env.TWOFA_ISSUER || 'AuthX'} (${userEmail})`,
    length: 20
  });
  return secret; // contains base32 secret + otpauth_url
};

export const generateQRCodeDataURL = async (otpauth_url) => {
  return await qrcode.toDataURL(otpauth_url);
};

export const verifyTOTP = (secretBase32, token) => {
  return speakeasy.totp.verify({
    secret: secretBase32,
    encoding: "base32",
    token,
    window: 1 // allow +/-1 step
  });
};
