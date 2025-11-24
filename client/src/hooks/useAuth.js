


import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api/auth";

export function useAuth() {
  const { auth, login: ctxLogin, logout: ctxLogout, setAuth } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --------------------------------
  // Save access & refresh tokens
  // --------------------------------
  const storeTokens = (access, refresh, user) => {
    ctxLogin({ user, access, refresh });
  };

  // --------------------------------
  // LOGIN
  // --------------------------------
  const login = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`${API_BASE}/login`, payload);
      const data = res.data?.data;

      // 2FA step required — do not store tokens yet
      if (data?.twoFARequired) {
        return { twoFARequired: true };
      }

      storeTokens(data.access, data.refresh, data.user);
      return data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // REGISTER
  // --------------------------------
  const registerUser = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`${API_BASE}/register`, payload);
      return res.data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Registration failed";
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // REFRESH TOKEN
  // --------------------------------
  const refresh = async () => {
    try {
      const res = await axios.post(`${API_BASE}/refresh`);
      const newAccess = res.data?.data?.access;

      if (!newAccess) throw new Error("No access token received");

      // update only the access token (keep same refresh & user)
      setAuth((prev) => ({
        ...prev,
        access: newAccess,
      }));

      return newAccess;
    } catch (err) {
      setError("Session expired, please login again");
      ctxLogout();
      throw new Error("Session expired");
    }
  };

  // --------------------------------
  // LOGOUT
  // --------------------------------
  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`);
    } catch (err) {
      console.warn("Logout error:", err);
    }

    ctxLogout();
    setError(null);
  };

  // --------------------------------
  // ME (Load logged-in user)
  // --------------------------------
  const me = async () => {
    try {
      const token = auth?.access;
      if (!token) throw new Error("No access token available");

      const res = await axios.get(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data?.data;

      // update context user
      setAuth((prev) => ({ ...prev, user }));

      return user;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load user";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return {
    loading,
    error,
    login,
    registerUser,
    refresh,
    logout,
    me,
  };
}
