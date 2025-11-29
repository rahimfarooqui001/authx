
// src/hooks/use2FA.js
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { axiosClient } from "../api/axios";
import { useAuth } from "./useAuth";

export function use2FA() {
  const [faLoading, setFaLoading] = useState(false);
  const [faError, setFaError] = useState(null);
  const { auth, setUser } = useContext(AuthContext);
  const {getUser}=useAuth()

  const setup2FA = async () => {
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/setup`, {});
   
      return res.data?.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA setup failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  const verifyAndEnable2FA = async (payload) => {
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/verify`, payload);
      await getUser()
    console.log(res.data)
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA verification failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  const disable2FA = async (payload) => {
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/disable`, payload);
   
    await getUser()
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
