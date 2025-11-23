import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { gsap } from "gsap";

export default function ResetPassword() {
  const cardRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);

//   useEffect(() => {
//     gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 0.6 });
//   }, []);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    console.log("RESET PASSWORD:", data);
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={cardRef} className="card glass max-w-md w-full p-8">

        <h1 className="h1 gold-text mb-2">Reset Password</h1>

        {done ? (
          <p className="text-green-400 text-sm">
            Password has been reset successfully.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="text-xs muted">New Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" }
                  })}
                  type={showPass ? "text" : "password"}
                  className="input mt-1"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-300 hover:text-white"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            <button className="btn-primary w-full mt-4">Reset Password</button>
          </form>
        )}

      </div>
    </div>
  );
}
