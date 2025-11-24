// import React, { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import { CheckCircle2, Shield, User, Mail, Crown } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const user = auth?.user || {};

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       <div
//         className="w-full max-w-lg rounded-xl p-8 shadow-2xl backdrop-blur-md"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
//           border: "1px solid rgba(255,255,255,0.06)"
//         }}
//       >
//         {/* Header */}
//         <h1
//           className="text-3xl font-semibold mb-6 text-center"
//           style={{ color: "var(--gold)" }}
//         >
//           Dashboard
//         </h1>

//         {/* User Info Box */}
//         <div className="space-y-5 mb-8">

//           {/* Name */}
//           <div className="flex items-center gap-3">
//             <User size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Name</p>
//               <p className="text-white text-lg font-medium">{user?.name}</p>
//             </div>
//           </div>

//           {/* Email */}
//           <div className="flex items-center gap-3">
//             <Mail size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Email</p>
//               <p className="text-white text-lg font-medium">{user.email}</p>
//             </div>
//           </div>

//           {/* Role */}
//           <div className="flex items-center gap-3">
//             <Crown size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Role</p>
//               <p className="text-white text-lg font-medium capitalize">
//                 {user.role}
//               </p>
//             </div>
//           </div>

//           {/* Verified Badge */}
//           <div className="flex items-center gap-3">
//             <Shield size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Account Status</p>

//               <p className="flex items-center gap-2 text-green-400 font-medium">
//                 <CheckCircle2 size={18} /> Verified
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 2FA Button */}
//         <button
//           onClick={() => navigate("/2fa")}
//           className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
//           style={{
//             background: "linear-gradient(90deg, #d4af37, #b0892f)",
//             color: "#050505",
//             boxShadow: "0 6px 20px rgba(212,175,55,0.35)"
//           }}
//         >
//           <Shield size={18} />
//           Setup Two-Factor Authentication
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import { CheckCircle2, Shield, User, Mail, Crown, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const { auth, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const user = auth?.user || {};

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{ backgroundColor: "var(--bg)" }}
//     >
//       <div
//         className="w-full max-w-lg rounded-xl p-8 shadow-2xl backdrop-blur-md"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
//           border: "1px solid rgba(255,255,255,0.06)"
//         }}
//       >
//         {/* Header */}
//         <h1
//           className="text-3xl font-semibold mb-8 text-center"
//           style={{ color: "var(--gold)" }}
//         >
//           Dashboard
//         </h1>

//         {/* USER INFO */}
//         <div className="space-y-6 mb-10">

//           {/* Name */}
//           <div className="flex items-center gap-3">
//             <User size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Name</p>
//               <p className="text-white text-lg font-medium">{user?.name}</p>
//             </div>
//           </div>

//           {/* Email */}
//           <div className="flex items-center gap-3">
//             <Mail size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Email</p>
//               <p className="text-white text-lg font-medium">{user?.email}</p>
//             </div>
//           </div>

//           {/* Role */}
//           <div className="flex items-center gap-3">
//             <Crown size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Role</p>
//               <p className="text-white text-lg font-medium capitalize">
//                 {user?.role}
//               </p>
//             </div>
//           </div>

//           {/* Verified Badge */}
//           <div className="flex items-center gap-3">
//             <Shield size={22} className="text-gray-300" />
//             <div>
//               <p className="text-gray-400 text-sm">Account Status</p>

//               <p className="flex items-center gap-2 text-green-400 font-medium">
//                 <CheckCircle2 size={18} />
//                 Verified
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 2FA Button */}
//         <button
//           onClick={() => navigate("/2fa")}
//           className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition hover:opacity-90"
//           style={{
//             background: "linear-gradient(90deg, #d4af37, #b0892f)",
//             color: "#050505",
//             boxShadow: "0 6px 20px rgba(212,175,55,0.35)"
//           }}
//         >
//           <Shield size={18} />
//           Setup Two-Factor Authentication
//         </button>

//         {/* LOGOUT BUTTON */}
//         <button
//           onClick={logout}
//           className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mt-4 transition 
//                      bg-red-600/20 border border-red-600/40 text-red-400 hover:bg-red-600/30"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  CheckCircle2,
  Shield,
  User,
  Mail,
  Crown,
  LogOut,
  Lock,
  Unlock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { use2FA } from "../hooks/use2FA";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { disable2FA, faLoading } = use2FA();

  const user = auth?.user || {};

  // Disable 2FA handler
//   const handleDisable = async () => {
//     try {
//       const res = await disable2FA({});
//       if (res?.success) {
//         toast.success("Two-Factor Authentication disabled");
//         window.location.reload();
//       }
//     } catch (err) {
//       toast.error("Failed to disable 2FA");
//     }
//   };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Verified Badge */}
      {user?.isVerified && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">Verified</span>
        </div>
      )}

      {/* Main Card */}
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-2xl backdrop-blur-xl relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        {/* Header */}
        <h1
          className="text-4xl font-semibold mb-10 text-center tracking-wide"
          style={{ color: "var(--gold)" }}
        >
          Welcome, {user?.name?.split(" ")[0] || "User"} ✨
        </h1>

        {/* User Info */}
        <div className="space-y-7 mb-12">
          {/* Name */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <User size={22} className="text-gray-200" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white text-lg font-medium">{user?.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <Mail size={22} className="text-gray-200" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white text-lg font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <Crown size={22} className="text-gray-200" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-white text-lg font-medium capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          {/* Account Status */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <Shield size={22} className="text-gray-200" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Account Status</p>
              <p className="flex items-center gap-2 text-green-400 font-medium">
                <CheckCircle2 size={18} /> Verified
              </p>
            </div>
          </div>
        </div>

        {/* 2FA Button Section */}
        {user?.twoFAEnabled ? (
          <button
           onClick={() => navigate("/2fa/disable")}
            // disabled={faLoading}
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
                     transition hover:bg-red-600/40 bg-red-600/30 border border-red-600/50 text-red-300"
          >
            {faLoading ? (
              "Disabling..."
            ) : (
              <>
                <Unlock size={18} />
                Disable Two-Factor Authentication
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/2fa")}
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #d4af37, #b0892f)",
              color: "#050505",
              boxShadow: "0 6px 20px rgba(212,175,55,0.35)"
            }}
          >
            <Lock size={18} />
            Enable Two-Factor Authentication
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
                     transition bg-gray-800/40 border border-gray-700 text-gray-300 
                     hover:bg-gray-800/60"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

