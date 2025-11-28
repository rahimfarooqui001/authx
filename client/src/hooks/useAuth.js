


// import axios from "axios";
// import { useState, useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import { axiosClient } from "../api/axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api/auth";

// export function useAuth() {
//   const { auth, login: ctxLogin, logout: ctxLogout, setAuth } =
//     useContext(AuthContext);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // --------------------------------
//   // Save access & refresh tokens
//   // --------------------------------
//   const storeTokens = (access, refresh, user) => {
//     ctxLogin({ user, access, refresh });
//   };

//   const login = async (payload) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.post(`${API_BASE}/login`, payload);
//       const data = res.data?.data;
    
//       if (data?.twoFARequired) {
//         return { twoFARequired: true };
//       }

//       storeTokens(data.access, data.refresh, data.user);
//       return data;
//     } catch (err) {
//       const errorMsg = 
//         err?.response?.data?.message || "Login failed. Please try again.";
//       setError(errorMsg);
//       return { error: errorMsg };
//     } finally {
//       setLoading(false);
//     }
//   };


//   const registerUser = async (payload) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.post(`${API_BASE}/register`, payload);
//       return res.data;
//     } catch (err) {
//       const errorMsg =
//         err?.response?.data?.message || "Registration failed";
//       setError(errorMsg);
//       return { error: errorMsg };
//     } finally {
//       setLoading(false);
//     }
//   };


//   const refresh = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/refresh`);
//       const newAccess = res.data?.data?.access;

//       if (!newAccess) throw new Error("No access token received");

//       // update only the access token (keep same refresh & user)
//       setAuth((prev) => ({
//         ...prev,
//         access: newAccess,
//       }));

//       return newAccess;
//     } catch (err) {
//       setError("Session expired, please login again");
//       ctxLogout();
//       throw new Error("Session expired");
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(`${API_BASE}/logout`);
//     } catch (err) {
//       console.warn("Logout error:", err);
//     }

//     ctxLogout();
//     setError(null);
//   };


// const getUser = async () => {
//   try {
//     const res = await axiosClient.get(`/user`);
    
//     const user = res.data?.data || res.data?.user;
//     setAuth((prev) => ({ ...prev, user }));

//     return user;
//   } catch (err) {
//     const errorMsg = err.response?.data?.message || "Failed to load user";
//     setError(errorMsg);
//     throw new Error(errorMsg);
//   }
// };

//   return {
//     loading,
//     error,
//     login,
//     registerUser,
//     refresh,
//     logout,
//     getUser,
//   };
// }

import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { axiosClient } from "../api/axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api/auth";

export function useAuth() {
  const { auth, login: ctxLogin, logout: ctxLogout, setAuth } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --------------------------------
  // Save access & refresh tokens
  // --------------------------------
  const storeTokens = (access, refresh, user) => {
    ctxLogin({ user, access, refresh });
  };

  // --------------------------------
  // LOGIN (supports 2FA or Recovery Code)
  // --------------------------------
  const login = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`${API_BASE}/login`, payload);
      const data = res.data?.data;

      // Backend signals that 2FA or recovery code is required
      if (data?.twoFARequired) {
        return { twoFARequired: true };
      }

      // If recovery code was used, backend will return full login info
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

      const res = await axios.post(`${API_BASE}/register`, payload);
      console.log(res.data?.data)
     const data=res?.data?.data
     storeTokens(data.access, data.refresh, data.user);
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
      const res = await axios.post(`${API_BASE}/refresh`);
      const newAccess = res.data?.data?.access;

      if (!newAccess) throw new Error("No access token received");

      // update only the access token (keep same refresh & user)
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
      await axios.post(`${API_BASE}/logout`);
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
