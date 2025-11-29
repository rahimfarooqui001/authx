

import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { axiosClient, publicAxios } from "../api/axios";



export function useAuth() {
  const { auth, login: ctxLogin, logout: ctxLogout, setAuth } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const storeTokens = (access, refresh, user) => {
    ctxLogin({ user, access, refresh });
  };


  const login = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await publicAxios.post(`/login`, payload);
      const data = res.data?.data;

      if (data?.twoFARequired) {
        return { twoFARequired: true };
      }

      storeTokens(data.access, data.refresh, data.user);
      return data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await publicAxios.post(`/register`, payload);
      console.log(res.data?.data)
     const data=res?.data?.data
      return data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Registration failed";
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      const res = await publicAxios.post(`/refresh`);
      const newAccess = res.data?.data?.access;

      if (!newAccess) throw new Error("No access token received");

    
      setAuth((prev) => ({ ...prev, access: newAccess }));
      return newAccess;
    } catch (err) {
      setError("Session expired, please login again");
      ctxLogout();
      throw new Error("Session expired");
    }
  };

  const logout = async () => {
    try {
      await publicAxios.post(`/logout`);
    } catch (err) {
      console.warn("Logout error:", err);
    }

    ctxLogout();
    setError(null);
  };

  const getUser = async () => {
    try {
      const res = await axiosClient.get(`/user`);
      const user = res.data?.data || res.data?.user;
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
    getUser,
  };
}
