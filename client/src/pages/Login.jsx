





// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import { Eye, EyeOff, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import toast from "react-hot-toast";

// export default function Login() {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [twoFARequired, setTwoFARequired] = useState(false);
//   const [credentials, setCredentials] = useState({ email: "", password: "" });

//   const { loading, login, error } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // GSAP entrance animation
//   useEffect(() => {
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 30, scale: 0.95 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
//     );
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       // --------------------------------
//       // Step 2: Verify 2FA
//       // --------------------------------
//       if (twoFARequired) {
//         const payload = {
//           email: credentials.email,
//           password: credentials.password,
//           twoFAToken: data.twoFAToken,
//         };

//         const result = await login(payload);

//         if (result?.access) {
//           toast.success("Login successful");
//           navigate("/dashboard");
//         }
//         return;
//       }

//       // --------------------------------
//       // Step 1: Normal login
//       // --------------------------------
//       const payload = { email: data.email, password: data.password };
//       const result = await login(payload);

//       // Requires 2FA
//       if (result?.twoFARequired) {
//         setCredentials({ email: data.email, password: data.password });
//         setTwoFARequired(true);
//         return;
//       }

//       // Successful login without 2FA
//       if (result?.access) {
//         toast.success("Login successful");
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   const currentError = error;
//   const isLoading = loading;

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       {/* Animated background highlights */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//       </div>

//       <div
//         ref={cardRef}
//         className="card w-full max-w-md p-8 glass relative z-10 rounded-xl border border-white/10 shadow-2xl"
//       >
//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
//             Welcome Back
//           </h1>
//           <p className="muted text-sm">Sign in to continue to AuthX</p>
//         </div>

//         {/* ERRORS */}
//         {currentError && (
//           <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
//             <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
//             <span className="text-red-400 text-sm">{currentError}</span>
//           </div>
//         )}

//         {/* 2FA MESSAGE */}
//         {twoFARequired && (
//           <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-6">
//             <CheckCircle2 size={20} className="text-green-400" />
//             <span className="text-green-400 text-sm">
//               2FA required — enter your 6-digit verification code.
//             </span>
//           </div>
//         )}

//         {/* FORM */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* EMAIL FIELD */}
//           {!twoFARequired && (
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-2 text-gray-300">Email Address</label>
//               <input
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email",
//                   },
//                 })}
//                 type="email"
//                 placeholder="you@example.com"
//                 className="input"
//                 disabled={isLoading}
//               />
//               {errors.email && (
//                 <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
//                   <AlertTriangle size={12} /> {errors.email.message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* PASSWORD FIELD */}
//           {!twoFARequired && (
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-2 text-gray-300">Password</label>

//               <div className="relative">
//                 <input
//                   {...register("password", {
//                     required: "Password required",
//                     minLength: { value: 6, message: "Min 6 characters" },
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="input pr-12"
//                   disabled={isLoading}
//                 />

//                 {/* Eye toggle */}
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>

//               {errors.password && (
//                 <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
//                   <AlertTriangle size={12} /> {errors.password.message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* 2FA FIELD */}
//           {twoFARequired && (
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-2 text-gray-300">
//                 2FA Verification Code
//               </label>
//               <input
//                 {...register("twoFAToken", {
//                   required: "Enter your 6-digit code",
//                   pattern: {
//                     value: /^[0-9]{6}$/,
//                     message: "Must be 6 digits",
//                   },
//                 })}
//                 maxLength={6}
//                 placeholder="000000"
//                 className="input text-center text-2xl tracking-widest font-mono"
//                 autoComplete="off"
//                 disabled={isLoading}
//               />

//               {errors.twoFAToken && (
//                 <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
//                   <AlertTriangle size={12} /> {errors.twoFAToken.message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 <span>Processing...</span>
//               </>
//             ) : (
//               <span>{twoFARequired ? "Verify & Sign In" : "Sign In"}</span>
//             )}
//           </button>

//           {/* FOOTER ACTIONS */}
//           <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/40">
//             <button
//               type="button"
//               onClick={() => navigate("/forgot-password")}
//               className="text-sm hover-gold transition"
//               disabled={isLoading}
//             >
//               Forgot password?
//             </button>

//             {twoFARequired && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setTwoFARequired(false);
//                   setCredentials({ email: "", password: "" });
//                 }}
//                 className="text-sm text-gray-400 hover:text-white transition"
//                 disabled={isLoading}
//               >
//                 Back to login
//               </button>
//             )}
//           </div>
//         </form>

//         {/* SIGN UP LINK */}
//         {!twoFARequired && (
//           <div className="mt-8 text-center">
//             <p className="text-sm muted">
//               Don’t have an account?{" "}
//               <button
//                 className="gold-text hover:underline font-medium"
//                 onClick={() => navigate("/signup")}
//               >
//                 Sign up
//               </button>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Eye, EyeOff, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);

  const { loading, login, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

 const onSubmit = async (data) => {
  try {
    // Step 2: Handle 2FA / Recovery Code
    if (twoFARequired) {
      const payload = {
        email: credentials.email,
        password: credentials.password,
        twoFAToken: useRecoveryCode ? undefined : data.twoFAToken,
        recoveryCode: useRecoveryCode ? data.recoveryCode : undefined,
      };

      const result = await login(payload);

      if (result?.access) {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(result?.error || "Invalid 2FA or recovery code");
      }
      return;
    }

    // Step 1: Normal login
    const payload = { email: data.email, password: data.password };
    const result = await login(payload);

    if (result?.twoFARequired) {
      // Store credentials to use for 2FA/recovery code
      setCredentials({ email: data.email, password: data.password });
      setTwoFARequired(true);
      setUseRecoveryCode(false);
      return;
    }

    if (result?.access) {
      toast.success("Login successful");
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};


  const currentError = error;
  const isLoading = loading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Animated background highlights */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div ref={cardRef} className="card w-full max-w-md p-8 glass relative z-10 rounded-xl border border-white/10 shadow-2xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>Welcome Back</h1>
          <p className="muted text-sm">Sign in to continue to AuthX</p>
        </div>

        {/* ERRORS */}
        {currentError && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
            <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{currentError}</span>
          </div>
        )}

        {/* 2FA MESSAGE */}
        {twoFARequired && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-6">
            <CheckCircle2 size={20} className="text-green-400" />
            <span className="text-green-400 text-sm">
              {useRecoveryCode
                ? "Enter one of your recovery codes."
                : "2FA required — enter your 6-digit verification code."}
            </span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL FIELD */}
          {!twoFARequired && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2 text-gray-300">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="input"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.email.message}</p>}
            </div>
          )}

          {/* PASSWORD FIELD */}
          {!twoFARequired && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative">
                <input
                  {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input pr-12"
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.password.message}</p>}
            </div>
          )}

          {/* 2FA / Recovery Code FIELD */}
          {twoFARequired && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2 text-gray-300">
                {useRecoveryCode ? "Recovery Code" : "2FA Verification Code"}
              </label>
              <input
                {...register(useRecoveryCode ? "recoveryCode" : "twoFAToken", {
                  required: "This field is required",
                  pattern: useRecoveryCode ? undefined : { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                })}
                maxLength={useRecoveryCode ? 16 : 6}
                placeholder={useRecoveryCode ? "Enter recovery code" : "000000"}
                className="input text-center text-2xl tracking-widest font-mono"
                autoComplete="off"
                disabled={isLoading}
              />
              {errors.twoFAToken && !useRecoveryCode && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.twoFAToken.message}</p>
              )}
              {errors.recoveryCode && useRecoveryCode && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={12} /> {errors.recoveryCode.message}</p>
              )}

              {/* Toggle recovery code */}
              <button
                type="button"
                className="text-sm text-gray-400 mt-2 hover:text-white transition self-end"
                onClick={() => setUseRecoveryCode(!useRecoveryCode)}
                disabled={isLoading}
              >
                {useRecoveryCode ? "Use 2FA code instead" : "Use recovery code instead"}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full mt-6 flex items-center justify-center gap-2" disabled={isLoading}>
            {isLoading ? <><Loader2 size={18} className="animate-spin" /><span>Processing...</span></> : <span>{twoFARequired ? "Verify & Sign In" : "Sign In"}</span>}
          </button>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/40">
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm hover-gold transition" disabled={isLoading}>
              Forgot password?
            </button>
            {twoFARequired && (
              <button type="button" onClick={() => { setTwoFARequired(false); setCredentials({ email: "", password: "" }); setUseRecoveryCode(false); }} className="text-sm text-gray-400 hover:text-white transition" disabled={isLoading}>
                Back to login
              </button>
            )}
          </div>
        </form>

        {/* SIGN UP LINK */}
        {!twoFARequired && (
          <div className="mt-8 text-center">
            <p className="text-sm muted">
              Don’t have an account?{" "}
              <button className="gold-text hover:underline font-medium" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
