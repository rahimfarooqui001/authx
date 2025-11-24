// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import { Lock, AlertTriangle, Loader2, ShieldOff } from "lucide-react";
// import { use2FA } from "../hooks/use2FA";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Disable2FA() {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();
//   const { disable2FA, faLoading, faError } = use2FA();
//   const [mode, setMode] = useState("password"); // "password" OR "token"

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   // GSAP animation
//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.fromTo(
//         cardRef.current,
//         { opacity: 0, y: 25, scale: 0.95 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
//       );
//     }
//   }, []);

//   // Handle submit
//   const onSubmit = async (data) => {
//     try {
//       const payload =
//         mode === "password"
//           ? { password: data.password }
//           : { token: data.token };

//       const res = await disable2FA(payload);

//       if (res?.success) {
//         toast.success("Two-Factor Authentication disabled");
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       toast.error("Failed to disable 2FA");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       {/* Animated background */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//       </div>

//       <div ref={cardRef} className="card glass w-full max-w-md p-8 relative z-10">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <ShieldOff className="text-red-400" size={34} />
//           </div>

//           <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
//             Disable Two-Factor Auth
//           </h1>
//           <p className="text-gray-400 text-sm">
//             For security, confirm your identity below.
//           </p>
//         </div>

//         {/* Error */}
//         {(faError || errors.password || errors.token) && (
//           <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
//             <AlertTriangle size={20} className="text-red-400" />
//             <span className="text-red-400 text-sm">
//               {faError ||
//                 errors.password?.message ||
//                 errors.token?.message ||
//                 "Invalid input"}
//             </span>
//           </div>
//         )}

//         {/* Toggle Buttons */}
//         <div className="flex mb-6 border border-gray-700/50 rounded-lg overflow-hidden">
//           <button
//             className={`w-1/2 py-2 text-sm font-medium transition ${
//               mode === "password"
//                 ? "bg-white/10 text-white"
//                 : "text-gray-400 hover:text-white"
//             }`}
//             onClick={() => setMode("password")}
//             disabled={faLoading}
//           >
//             Use Password
//           </button>
//           <button
//             className={`w-1/2 py-2 text-sm font-medium transition ${
//               mode === "token"
//                 ? "bg-white/10 text-white"
//                 : "text-gray-400 hover:text-white"
//             }`}
//             onClick={() => setMode("token")}
//             disabled={faLoading}
//           >
//             Use 6-Digit Code
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* PASSWORD MODE */}
//           {mode === "password" && (
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-300 mb-2">Confirm Password</label>
//               <input
//                 {...register("password", {
//                   required: "Password required"
//                 })}
//                 type="password"
//                 placeholder="••••••••"
//                 className="input"
//                 disabled={faLoading}
//               />
//             </div>
//           )}

//           {/* TOKEN MODE */}
//           {mode === "token" && (
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-300 mb-2">6-Digit Code</label>
//               <input
//                 {...register("token", {
//                   required: "Code required",
//                   pattern: {
//                     value: /^[0-9]{6}$/,
//                     message: "Code must be 6 digits"
//                   }
//                 })}
//                 placeholder="000000"
//                 maxLength={6}
//                 className="input text-center text-2xl tracking-widest font-mono"
//                 disabled={faLoading}
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
//             disabled={faLoading}
//           >
//             {faLoading ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 <span>Disabling...</span>
//               </>
//             ) : (
//               <>
//                 <ShieldOff size={18} />
//                 <span>Disable 2FA</span>
//               </>
//             )}
//           </button>

//           {/* Back Button */}
//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="w-full py-2 text-sm text-gray-400 hover:text-white mt-3 transition"
//           >
//             Back to Dashboard
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Lock, AlertTriangle, Loader2, ShieldOff } from "lucide-react";
import { use2FA } from "../hooks/use2FA";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Disable2FA() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { disable2FA, faLoading, faError } = use2FA();

  const [mode, setMode] = useState("password"); // password | token
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // GSAP Fade-in Animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );
  }, []);

  // Handle OTP input switching
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Submit disable request
  const onSubmit = async (data) => {
    try {
      let payload = {};

      if (mode === "password") {
        payload.password = data.password;
      } else {
        const token = otp.join("");
        if (token.length !== 6) {
          toast.error("Enter 6-digit code");
          return;
        }
        payload.token = token;
      }

      const res = await disable2FA(payload);

      if (res?.success) {
        toast.success("Two-Factor Authentication disabled");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Failed to disable 2FA");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Card */}
      <div ref={cardRef} className="card glass w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldOff className="text-red-400" size={34} />
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
            Disable Two-Factor Auth
          </h1>
          <p className="text-gray-400 text-sm">
            Confirm your identity to disable 2FA.
          </p>
        </div>

        {/* Error */}
        {(faError || errors.password || errors.code) && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
            <AlertTriangle size={20} className="text-red-400" />
            <span className="text-red-400 text-sm">
              {faError ||
                errors.password?.message ||
                errors.code?.message ||
                "Invalid input"}
            </span>
          </div>
        )}

        {/* Mode Switch */}
        <div className="flex mb-6 border border-gray-700/50 rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 text-sm font-medium transition ${
              mode === "password"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setMode("password")}
            disabled={faLoading}
          >
            Use Password
          </button>

          <button
            className={`w-1/2 py-2 text-sm font-medium transition ${
              mode === "token"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setMode("token")}
            disabled={faLoading}
          >
            Use 6-Digit Code
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* PASSWORD INPUT */}
          {mode === "password" && (
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Confirm Password
              </label>
              <input
                {...register("password", { required: "Password required" })}
                type="password"
                placeholder="••••••••"
                className="input"
                disabled={faLoading}
              />
            </div>
          )}

          {/* OTP INPUT */}
          {mode === "token" && (
            <div>
              <label className="text-sm text-gray-300 mb-3 block">
                Enter 6-Digit Code
              </label>

              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-14 bg-white/10 border border-gray-700 rounded-xl text-white text-2xl font-semibold text-center focus:ring-2 focus:ring-yellow-500 outline-none"
                    disabled={faLoading}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            disabled={faLoading}
          >
            {faLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Disabling...</span>
              </>
            ) : (
              <>
                <ShieldOff size={18} />
                <span>Disable 2FA</span>
              </>
            )}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full py-2 text-sm text-gray-400 hover:text-white mt-3 transition"
            disabled={faLoading}
          >
            Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
