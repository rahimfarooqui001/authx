import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";

export default function TwoFASetup({ qr, secret }) {
  const cardRef = useRef(null);
  const { register, handleSubmit } = useForm();

//   useEffect(() => {
//     gsap.from(cardRef.current, { opacity: 0, y: 35, duration: 0.6 });
//   }, []);

  const onSubmit = (data) => {
    console.log("VERIFY 2FA:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={cardRef} className="card glass max-w-md w-full p-8">

        <h1 className="h1 gold-text mb-2">Enable 2FA</h1>
        <p className="muted text-sm mb-4">
          Scan this QR code using Google Authenticator.
        </p>

        <img src={qr} alt="QR Code" className="mx-auto w-48 mb-4" />

        <p className="text-xs muted mb-6">Backup Key: {secret}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-xs muted">Enter the 6-digit code</label>
            <input
              {...register("token", { required: true })}
              placeholder="123456"
              className="input mt-1"
            />
          </div>

          <button className="btn-primary w-full mt-4">Verify & Enable</button>
        </form>

      </div>
    </div>
  );
}
