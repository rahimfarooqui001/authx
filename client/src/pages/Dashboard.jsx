


import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  CheckCircle2,
  XCircle,
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
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { faLoading } = use2FA();
  const { logout } = useAuth();

  const user = auth?.user || {};

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 relative"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Email Verified Badge */}
      {/* {user?.emailVerified ? (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 px-2 sm:px-3 py-1 rounded-xl backdrop-blur-md shadow-lg">
          <CheckCircle2 size={16} />
          <span className="hidden sm:block text-sm font-medium">Email Verified</span>
        </div>
      ) : (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-2 sm:px-3 py-1 rounded-xl backdrop-blur-md">
          <XCircle size={16} />
          <span className="hidden sm:block text-sm font-medium">Email Not Verified</span>
        </div>
      )} */}

      {/* Main Card */}
      <div
        className="w-full max-w-xl rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        {/* Header */}
        <h1
          className="text-3xl sm:text-4xl font-semibold mb-8 text-center tracking-wide"
          style={{ color: "var(--gold)" }}
        >
          Welcome, {user?.name?.split(" ")[0] || "User"} ✨
        </h1>

        {/* User Info */}
        <div className="space-y-6 sm:space-y-7 mb-10">
          {/* Name */}
          <UserInfo
            icon={<User size={22} className="text-gray-200" />}
            label="Name"
            value={user?.name}
          />

          {/* Email */}
          <UserInfo
            icon={<Mail size={22} className="text-gray-200" />}
            label="Email"
            value={user?.email}
            extra={
              user.emailVerified ? (
                <CheckCircle2 size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )
            }
          />

          {/* Role */}
          <UserInfo
            icon={<Crown size={22} className="text-gray-200" />}
            label="Role"
            value={user?.role}
          />

          {/* Account Status */}
          <UserInfo
            icon={<Shield size={22} className="text-gray-200" />}
            label="Account Status"
            value={
              <span className="flex items-center gap-2 text-green-400 font-medium">
                <CheckCircle2 size={18} /> Active
              </span>
            }
          />
        </div>

        {/* --- 2FA Section --- */}
        {user?.twoFAEnabled ? (
          <button
            onClick={() => navigate("/2fa/disable")}
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
            transition hover:bg-red-600/40 bg-red-600/30 border border-red-600/50 text-red-300 text-sm sm:text-base"
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
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition hover:opacity-90 text-sm sm:text-base"
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

        {/* Logout */}
        <button
          onClick={async () => {
            await logout();
            toast.success("Logout successful!");
          }}
          className="mt-6 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
            transition bg-gray-800/40 border border-gray-700 text-gray-300 hover:bg-gray-800/60 text-sm sm:text-base"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}



function UserInfo({ icon, label, value, extra }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-white/10 p-3 rounded-xl">{icon}</div>
      <div className="flex-1">
        <p className="text-gray-400 text-xs sm:text-sm">{label}</p>
        <p className="text-white text-base sm:text-lg font-medium flex items-center gap-2 break-words">
          {value} {extra}
        </p>
      </div>
    </div>
  );
}
