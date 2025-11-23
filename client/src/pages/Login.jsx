import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [error, setError] = useState("");

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // GSAP


  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={cardRef} className="card w-full max-w-md p-8 glass">

        {/* TITLE */}
        <h1 className="h1 gold-text mb-1">Sign in to AuthX</h1>
        <p className="muted text-sm mb-6">Secure access using premium authentication.</p>

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-xs muted mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
              className="input"
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="text-xs muted mb-1">Password</label>

            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars required" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="•••••••"
                className="input"
              />

              {/* Toggle */}
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <span className="text-red-400 text-xs mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* 2FA INPUT */}
          {twoFARequired && (
            <div className="flex flex-col">
              <label className="text-xs muted mb-1">2FA Code</label>
              <input
                {...register("twoFAToken", {
                  required: "Enter the 6-digit code",
                  minLength: { value: 6, message: "Code must be 6 digits" },
                  maxLength: { value: 6, message: "Code must be 6 digits" },
                })}
                placeholder="123456"
                className="input"
              />

              {errors.twoFAToken && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.twoFAToken.message}
                </span>
              )}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary w-full mt-4">
            {twoFARequired ? "Verify & Sign In" : "Sign In"}
          </button>

          {/* Forgot */}
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="text-sm hover-gold mt-3"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}
