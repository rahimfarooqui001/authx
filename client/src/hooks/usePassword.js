// src/hooks/usePassword.js
import { useState } from "react";
import { publicAxios } from "../api/axios";
export function usePassword() {
  const [loading, setLoading] = useState(false);

  const requestReset = async (payload) => {
    try {
      setLoading(true);
      const res = await publicAxios.post(`/request-password-reset`, payload);
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
      const res = await publicAxios.post(`/reset-password`, payload);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Reset failed";
    } finally {
      setLoading(false);
    }
  };

  return { loading, requestReset, resetPassword };
}
