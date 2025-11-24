// src/hooks/usePassword.js
import axios from "axios";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api/auth";
export function usePassword() {
  const [loading, setLoading] = useState(false);

  const requestReset = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/request-password-reset`, payload);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Unable to send reset email";
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (payload) => {
    try {
        console.log(payload)
      setLoading(true);
      const res = await axios.post(`${API_BASE}/reset-password`, payload);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Reset failed";
    } finally {
      setLoading(false);
    }
  };

  return { loading, requestReset, resetPassword };
}
