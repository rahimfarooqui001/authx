// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { Eye, EyeOff } from "lucide-react";
// import { gsap } from "gsap";

// export default function ResetPassword() {
//   const cardRef = useRef(null);
//   const [showPass, setShowPass] = useState(false);
//   const [done, setDone] = useState(false);

// //   useEffect(() => {
// //     gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 0.6 });
// //   }, []);

//   const { register, handleSubmit, formState: { errors }, watch } = useForm();

//   const onSubmit = async (data) => {
//     console.log("RESET PASSWORD:", data);
//     setDone(true);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
//       <div ref={cardRef} className="card glass max-w-md w-full p-8">

//         <h1 className="h1 gold-text mb-2">Reset Password</h1>

//         {done ? (
//           <p className="text-green-400 text-sm">
//             Password has been reset successfully.
//           </p>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//             <div>
//               <label className="text-xs muted">New Password</label>
//               <div className="relative">
//                 <input
//                   {...register("password", {
//                     required: "Required",
//                     minLength: { value: 6, message: "Min 6 chars" }
//                   })}
//                   type={showPass ? "text" : "password"}
//                   className="input mt-1"
//                   placeholder="••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-3 text-gray-300 hover:text-white"
//                   onClick={() => setShowPass(!showPass)}
//                 >
//                   {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
//             </div>

//             <button className="btn-primary w-full mt-4">Reset Password</button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// }

// src/pages/ResetPassword.jsx
// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import { Lock, AlertTriangle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { usePassword } from "../hooks/usePassword";

// export default function ResetPassword() {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();
//   const { token: tokenParam } = useParams();
//   const [query] = useSearchParams();

//   const token = tokenParam || query.get("token"); // accepts ANY style

//   const [step, setStep] = useState("reset");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const { loading, resetPassword } = usePassword();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset
//   } = useForm();

//   const password = watch("password");

//   useEffect(() => {
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 20, scale: 0.95 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
//     );
//   }, []);

//   // ---- SUBMIT ----
//   const onSubmit = async (data) => {
//     try {
//       setError("");

//       const res = await resetPassword({
//         token,
//         newPassword: data.password
//       });

//       if (res.success || res.message) {
//         setSuccessMessage("Password reset successful!");
//         setStep("success");
//         reset();

//         setTimeout(() => navigate("/"), 2500);
//       }
//     } catch (err) {
//       setError(err || "Failed to reset password");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       {/* Premium animated background */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-0 left-1/3 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//       </div>

//       <div ref={cardRef} className="card w-full max-w-md p-8 glass relative z-10">

//         {/* RESET STEP */}
//         {step === "reset" && (
//           <>
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Lock className="text-yellow-500" size={34} />
//               </div>

//               <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
//                 Reset Password
//               </h1>

//               <p className="text-gray-400 text-sm">
//                 Enter a strong new password below.
//               </p>
//             </div>

//             {error && (
//               <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
//                 <AlertTriangle size={20} className="text-red-400" />
//                 <span className="text-red-400 text-sm">{error}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//               {/* New Password */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium mb-2 text-gray-300">New Password</label>

//                 <input
//                   {...register("password", {
//                     required: "Password required",
//                     minLength: { value: 6, message: "Min 6 characters" },
//                     pattern: {
//                       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//                       message: "Include uppercase, lowercase & number",
//                     },
//                   })}
//                   type="password"
//                   placeholder="••••••••"
//                   className="input"
//                   disabled={loading}
//                 />

//                 {errors.password && (
//                   <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
//                     <AlertTriangle size={12} />
//                     {errors.password.message}
//                   </span>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium mb-2 text-gray-300">
//                   Confirm Password
//                 </label>

//                 <input
//                   {...register("confirmPassword", {
//                     required: "Please confirm password",
//                     validate: (v) => v === password || "Passwords do not match",
//                   })}
//                   type="password"
//                   placeholder="••••••••"
//                   className="input"
//                   disabled={loading}
//                 />

//                 {errors.confirmPassword && (
//                   <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
//                     <AlertTriangle size={12} />
//                     {errors.confirmPassword.message}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     <span>Resetting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Lock size={18} />
//                     <span>Reset Password</span>
//                   </>
//                 )}
//               </button>
//             </form>
//           </>
//         )}

//         {/* SUCCESS STEP */}
//         {step === "success" && (
//           <>
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle2 className="text-green-400" size={34} />
//               </div>

//               <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
//                 Success!
//               </h1>

//               <p className="text-gray-400 text-sm">{successMessage}</p>
//             </div>

//             <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
//               <CheckCircle2 size={20} className="text-green-400" />
//               <span className="text-green-400 text-sm">Redirecting to login...</span>
//             </div>

//             <button
//               className="btn-primary w-full flex items-center justify-center gap-2"
//               onClick={() => navigate("/")}
//             >
//               <ArrowLeft size={18} />
//               Back to Login
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import {
  Lock,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePassword } from "../hooks/usePassword";

export default function ResetPassword() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { token: tokenFromParams } = useParams();
  const [q] = useSearchParams();

  // Accept token from both sources
  const token = tokenFromParams || q.get("token");

  const [step, setStep] = useState("reset");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { loading, resetPassword } = usePassword();

  // Show password toggles
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  const onSubmit = async (data) => {
    setError("");

    try {
      const res = await resetPassword({
        token,
        newPassword: data.password
      });

      if (res.success || res.message) {
        setSuccessMessage("Your password has been reset successfully.");
        setStep("success");
        reset();

        setTimeout(() => navigate("/"), 2500);
      }
    } catch (err) {
      setError(err || "Failed to reset password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Premium Background Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        ref={cardRef}
        className="w-full max-w-md rounded-xl p-8 shadow-2xl backdrop-blur-md relative z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        {/* RESET STEP */}
        {step === "reset" && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-yellow-500" size={34} />
              </div>

              <h1 className="text-3xl font-bold mb-2" style={{ color: "#d4af37" }}>
                Reset Your Password
              </h1>

              <p className="text-gray-400 text-sm">Enter a strong new password.</p>
            </div>

            {/* Error Box */}
            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 text-gray-300">
                  New Password
                </label>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Must include uppercase, lowercase & number"
                      }
                    })}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 rounded-md text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white"
                    }}
                    disabled={loading}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 text-gray-300">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                      validate: (v) => v === password || "Passwords do not match"
                    })}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 rounded-md text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white"
                    }}
                    disabled={loading}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 rounded-md font-semibold mt-5 flex items-center justify-center gap-2 transition"
                style={{
                  background: "linear-gradient(90deg, #d4af37, #b0892f)",
                  color: "#050505",
                  boxShadow: "0 6px 20px rgba(212,175,55,0.3)"
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Resetting…
                  </>
                ) : (
                  <>
                    <Lock size={18} /> Reset Password
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* SUCCESS STEP */}
        {step === "success" && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={34} className="text-green-400" />
              </div>

              <h1 className="text-3xl font-bold mb-2" style={{ color: "#d4af37" }}>
                Password Reset!
              </h1>

              <p className="text-gray-400 text-sm">{successMessage}</p>
            </div>

            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
              <CheckCircle2 size={20} className="text-green-400" />
              <span className="text-green-400 text-sm">Redirecting to login…</span>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold"
              style={{
                background: "linear-gradient(90deg, #d4af37, #b0892f)",
                color: "#050505"
              }}
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} /> Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

