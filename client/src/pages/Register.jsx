// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import { Eye, EyeOff, AlertTriangle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function Register() {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
//   const{registerUser,loading,  error}=useAuth()



//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm();

//   const onSubmit = async (data) => {
//   const result= await registerUser(data)
//     if (result?.access) {
//         toast.success("Signup successfull");
//         navigate("/dashboard");
//       } else {
//         toast.error(result?.error );
//       }
//       return;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
//       <div ref={cardRef} className="card glass max-w-md w-full p-8">

//         <h1 className="h1 gold-text mb-1">Create an Account</h1>
//         <p className="muted mb-6 text-sm">Join AuthX with secure authentication.</p>

//         {error && (
//           <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
//             <AlertTriangle size={16} /> {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//           {/* Name */}
//           <div>
//             <label className="text-xs muted">Full Name</label>
//             <input
//               {...register("name", { required: "Name is required" })}
//               placeholder="John Doe"
//               className="input mt-1"
//             />
//             {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-xs muted">Email</label>
//             <input
//               {...register("email", { required: "Email is required" })}
//               type="email"
//               placeholder="you@example.com"
//               className="input mt-1"
//             />
//             {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-xs muted">Password</label>
//             <div className="relative">
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Min 6 chars required" }
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••"
//                 className="input mt-1"
//               />

//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-300 hover:text-white"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
//           </div>

//           <button className="btn-primary w-full mt-4" type="submit">
//             Create Account
//           </button>

//           <button
//             className="hover-gold text-sm mt-3"
//             type="button"
//             onClick={() => navigate("/login")}
//           >
//             Already have an account? Sign in
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import { Eye, EyeOff, AlertTriangle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import toast from "react-hot-toast";

// export default function Register() {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const { registerUser, loading, error } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // GSAP entrance animation
//   useEffect(() => {
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 25, scale: 0.95 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
//     );
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const result = await registerUser(data);

//       if (result?.access) {
//         toast.success("Signup successful");
//         navigate("/dashboard");
//       } else {
//         toast.error(result?.message || "Signup failed");
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       <div
//         ref={cardRef}
//         className="card glass max-w-md w-full p-8 relative rounded-xl shadow-2xl"
//       >
//         <h1 className="text-3xl font-bold gold-text mb-1">Create an Account</h1>
//         <p className="muted mb-6 text-sm">
//           Join AuthX with secure authentication.
//         </p>

//         {error && (
//           <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
//             <AlertTriangle size={16} /> {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="text-xs muted">Full Name</label>
//             <input
//               {...register("name", { required: "Name is required" })}
//               placeholder="John Doe"
//               className="input mt-1"
//             />
//             {errors.name && (
//               <p className="text-red-400 text-xs">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-xs muted">Email</label>
//             <input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//               type="email"
//               placeholder="you@example.com"
//               className="input mt-1"
//             />
//             {errors.email && (
//               <p className="text-red-400 text-xs">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-xs muted">Password</label>
//             <div className="relative">
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Min 6 characters" },
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••"
//                 className="input mt-1"
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-300 hover:text-white"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-400 text-xs">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className={`btn-primary w-full mt-4 flex justify-center items-center gap-2 ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           {/* Login Link */}
//           <button
//             type="button"
//             className="hover-gold text-sm mt-3"
//             onClick={() => navigate("/login")}
//             disabled={loading}
//           >
//             Already have an account? Sign in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const cardRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const { registerUser, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      if (result?.message) {
        // Show success message instead of redirect
        setSuccessMessage(result.message);
      } else {
        setSuccessMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // If signup succeeded, show confirmation UI
  if (successMessage) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          ref={cardRef}
          className="card glass max-w-md w-full p-8 relative rounded-xl shadow-2xl text-center"
        >
          <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Signup Successful!</h1>
          <p className="muted mb-6">{successMessage}</p>
          <a
            href="/login"
            className="btn-primary inline-block px-6 py-2 rounded mt-4"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        ref={cardRef}
        className="card glass max-w-md w-full p-8 relative rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold gold-text mb-1">Create an Account</h1>
        <p className="muted mb-6 text-sm">
          Join AuthX with secure authentication.
        </p>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs muted">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="input mt-1"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs muted">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="input mt-1"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs muted">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="input mt-1"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-300 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn-primary w-full mt-4 flex justify-center items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <button
            type="button"
            className="hover-gold text-sm mt-3"
            onClick={() => window.location.href = "/login"}
            disabled={loading}
          >
            Already have an account? Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
