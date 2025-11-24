import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Mail, AlertTriangle, CheckCircle2, Loader2, ArrowLeft, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePassword } from "../hooks/usePassword";

export default function ForgotPassword() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [step, setStep] = useState(token ? "reset" : "request"); // "request" | "success" | "reset"
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { loading, requestReset, resetPassword } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const password = watch("password");

  // GSAP entrance animation
  useEffect(() => {
    if (cardRef.current) {
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
    }
  }, [step]);

  const onRequestReset = async (data) => {
    try {
      setError(null);
      const result = await requestReset({ email: data.email });
      
      if (result?.success || result?.message) {
        setSuccessMessage("Password reset link has been sent to your email");
        setStep("success");
        reset();
      }
    } catch (err) {
      setError(err || "Failed to send reset email");
    }
  };

  const onResetPassword = async (data) => {
    try {
      setError(null);
      const result = await resetPassword({
        token,
        password: data.password
      });
      
      if (result?.success || result?.message) {
        setSuccessMessage("Password has been reset successfully");
        setStep("success");
        reset();
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError(err || "Failed to reset password");
    }
  };

  const renderRequestStep = () => (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-yellow-500" size={32} />
        </div>
        <h1 className="h1 gold-text mb-2 text-3xl font-bold">Forgot Password?</h1>
        <p className="muted text-sm">
          No worries, we'll send you reset instructions
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
          <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onRequestReset)} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-300">Email Address</label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="you@example.com"
            className="input"
            disabled={loading}
          />
          {errors.email && (
            <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertTriangle size={12} />
              {errors.email.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Mail size={18} />
              <span>Send Reset Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          disabled={loading}
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </form>
    </>
  );

  const renderResetStep = () => (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-yellow-500" size={32} />
        </div>
        <h1 className="h1 gold-text mb-2 text-3xl font-bold">Reset Password</h1>
        <p className="muted text-sm">
          Enter your new password below
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
          <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onResetPassword)} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-300">New Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Password must contain uppercase, lowercase, and number"
              }
            })}
            type="password"
            placeholder="Enter new password"
            className="input"
            disabled={loading}
          />
          {errors.password && (
            <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertTriangle size={12} />
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            type="password"
            placeholder="Confirm new password"
            className="input"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertTriangle size={12} />
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Resetting...</span>
            </>
          ) : (
            <>
              <Lock size={18} />
              <span>Reset Password</span>
            </>
          )}
        </button>
      </form>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <h1 className="h1 gold-text mb-2 text-3xl font-bold">Success!</h1>
        <p className="muted text-sm">
          {successMessage}
        </p>
      </div>

      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
        <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
        <div className="text-sm text-green-400">
          {step === "success" && !token && (
            <p>Please check your email inbox and spam folder for the reset link.</p>
          )}
          {step === "success" && token && (
            <p>Redirecting to login page...</p>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <ArrowLeft size={18} />
        <span>Back to Login</span>
      </button>

      {!token && (
        <button
          type="button"
          onClick={() => {
            setStep("request");
            setError(null);
            setSuccessMessage("");
          }}
          className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Didn't receive email? Try again
        </button>
      )}
    </>
  );

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" 
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={cardRef} className="card w-full max-w-md p-8 glass relative z-10">
        {step === "request" && renderRequestStep()}
        {step === "reset" && renderResetStep()}
        {step === "success" && renderSuccessStep()}
      </div>
    </div>
  );
}
