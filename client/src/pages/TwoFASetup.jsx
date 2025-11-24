import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { use2FA } from "../hooks/use2FA";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export default function TwoFASetup() {
  const cardRef = useRef(null);
  const { setup2FA, verifyAndEnable2FA, faLoading, faError } = use2FA();

  const [qr, setQr] = useState(null);
  const [secret, setSecret] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm();

  // OTP boxes controlled by watch
  const otp = watch("token", "");

  // Run GSAP animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // Fetch QR + secret on mount
  useEffect(() => {
    async function load() {
      const data = await setup2FA();
      if (data?.qrDataUrl) {
        setQr(data.qrDataUrl);
        setSecret(data.secret);
      }
    }
    load();
  }, []);

  const onSubmit = async (data) => {
    const result = await verifyAndEnable2FA(data);

    if (result?.success) {
      setSuccess(true);
    }
  };

  // Build OTP Boxes
  const handleOtpInput = (val, index) => {
    const digits = otp.split("");
    digits[index] = val.slice(-1);
    const updated = digits.join("");
    setValue("token", updated);

    // Auto move to next box
    const next = document.getElementById(`otp-${index + 1}`);
    if (val && next) next.focus();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div ref={cardRef} className="card glass max-w-md w-full p-8 relative">

        {!success ? (
          <>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--gold)" }}
            >
              Enable Two-Factor Authentication
            </h1>

            <p className="muted text-sm mb-6">
              Scan the QR code using Google Authenticator.
            </p>

            {/* QR */}
            {qr ? (
              <img
                src={qr}
                alt="2FA QR Code"
                className="mx-auto w-48 mb-4 rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-400 text-sm text-center mb-4">
                Loading QR code...
              </p>
            )}

            {/* Secret */}
            {secret && (
              <p
                className="text-sm text-center mb-8"
                style={{ color: "var(--gold)" }}
              >
                Backup Key:
                <span className="ml-2 text-gray-300">{secret}</span>
              </p>
            )}

            {/* Error */}
            {faError && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg mb-4">
                <AlertTriangle size={18} />
                {faError}
              </div>
            )}

            {/* OTP Input */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-semibold rounded-lg bg-black/20 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpInput(e.target.value, i)}
                    autoComplete="off"
                  />
                ))}
              </div>

              <input type="hidden" {...register("token")} />

              <button
                type="submit"
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                disabled={faLoading}
              >
                {faLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Enable"
                )}
              </button>
            </form>
          </>
        ) : (
          // SUCCESS BLOCK
          <div className="text-center">
            <CheckCircle2
              size={60}
              className="text-green-400 mx-auto mb-4"
            />

            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--gold)" }}
            >
              2FA Enabled!
            </h1>

            <p className="text-gray-300 mb-6">
              Your account now has extra protection.
            </p>

            <button
              className="btn-primary w-full"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

