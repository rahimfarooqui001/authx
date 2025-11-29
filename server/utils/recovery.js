import crypto from "crypto";

export const generateRecoveryCodes = (count = 10) => {
  const plainCodes = [];
  const hashedCodes = [];

  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString("hex"); // 8-char code
    const hash = crypto.createHash("sha256").update(code).digest("hex");

    plainCodes.push(code);
    hashedCodes.push(hash);
  }

  return { plainCodes, hashedCodes }; // ✅ must return object with both arrays
};




export const verifyRecoveryCode = (storedCodes, providedCode) => {
  if (!providedCode) {
    return { valid: false, message: "No recovery code provided", codeObj: null };
  }

 
  const providedHash = crypto.createHash("sha256").update(providedCode).digest("hex");


  const codeObj = storedCodes.find(c => c.code === providedHash);

  if (!codeObj) {
    return { valid: false, message: "Invalid recovery code", codeObj: null };
  }

  if (codeObj.used) {
    return { valid: false, message: "Recovery code already used", codeObj };
  }

 
  return { valid: true, message: "Recovery code valid", codeObj };
};

