import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

//   useEffect(() => {
//     gsap.from(cardRef.current, {
//       opacity: 0,
//       y: 40,
//       duration: 0.7,
//       ease: "power3.out",
//     });
//   }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    console.log("REGISTER FORM:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={cardRef} className="card glass max-w-md w-full p-8">

        <h1 className="h1 gold-text mb-1">Create an Account</h1>
        <p className="muted mb-6 text-sm">Join AuthX with secure authentication.</p>

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
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs muted">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
              className="input mt-1"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs muted">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars required" }
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
            {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          </div>

          <button className="btn-primary w-full mt-4" type="submit">
            Create Account
          </button>

          <button
            className="hover-gold text-sm mt-3"
            type="button"
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign in
          </button>
        </form>

      </div>
    </div>
  );
}
