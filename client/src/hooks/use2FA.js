// src/hooks/use2FA.js
import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/auth";

export function use2FA() {
  const [faLoading, setFaLoading] = useState(false);
  const [faError, setFaError] = useState(null);

  const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  });

  // ---------------------------
  // Setup: Get QR + Secret
  // ---------------------------
  const setup2FA = async () => {
    try {
      setFaLoading(true);
      setFaError(null);

      const res = await axios.post(
        `${API_BASE}/2fa/setup`,
        {},
        { headers: authHeader() }
      );

      return res.data?.data; // contains { qrDataUrl, secret }
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA setup failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  // ---------------------------
  // Verify + Enable 2FA
  // ---------------------------
  const verifyAndEnable2FA = async (payload) => {
    try {
      setFaLoading(true);
      setFaError(null);

      const res = await axios.post(
        `${API_BASE}/2fa/verify`,
        payload,
        { headers: authHeader() }
      );

      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA verification failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  // ---------------------------
  // Disable 2FA
  // ---------------------------
  const disable2FA = async (payload) => {
    try {
      setFaLoading(true);
      setFaError(null);

      const res = await axios.post(
        `${API_BASE}/2fa/disable`,
        payload,
        { headers: authHeader() }
      );

      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to disable 2FA";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  return { faLoading, faError, setup2FA, verifyAndEnable2FA, disable2FA };
}

