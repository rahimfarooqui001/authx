// // src/utils/axios.js
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/auth";

// // ---------------------------
// // Public Axios (no token needed)
// // ---------------------------
// export const publicAxios = axios.create({
//   baseURL: API_BASE,
// });

// // ---------------------------
// // Protected Axios Client
// // ---------------------------
// export const axiosClient = axios.create({
//   baseURL: API_BASE,
// });

// // Helper: check if JWT is expired
// const isTokenExpired = (token) => {
//   if (!token) return true;
//   const { exp } = jwtDecode(token);
//   return Date.now() >= exp * 1000;
// };

// // Request interceptor for token refresh & auth header
// axiosClient.interceptors.request.use(async (config) => {
//   // Skip auth if explicitly requested
//   if (config.skipAuth) return config;

//   let accessToken = sessionStorage.getItem("access");

//   // Refresh token if expired or missing
//   if (!accessToken || isTokenExpired(accessToken)) {
//     try {
//       const refreshToken = sessionStorage.getItem("refresh");
//       if (!refreshToken) throw new Error("No refresh token found");

//       const res = await publicAxios.post("/refresh", { refreshToken });
//       accessToken = res.data.accessToken;
//       sessionStorage.setItem("access", accessToken);
//     } catch (err) {
//       console.error("Refresh token failed:", err);
//       sessionStorage.clear();
//       window.location.href = "/login"; // auto logout
//       return Promise.reject(err);
//     }
//   }

//   // Attach Authorization header
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// }, (error) => Promise.reject(error));

// // Optional: response interceptor for logging/debug
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized request:", error.response.data);
//     }
//     return Promise.reject(error);
//   }
// );





// src/utils/axios.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/auth";

// ---------------------------
// Public Axios (no token needed)
// ---------------------------
export const publicAxios = axios.create({
  baseURL: API_BASE,
});

// ---------------------------
// Protected Axios Client
// ---------------------------
export const axiosClient = axios.create({
  baseURL: API_BASE,
});

// Helper: check if JWT is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000; // convert seconds to ms
};

// Request interceptor for token refresh & auth header
axiosClient.interceptors.request.use(async (config) => {
  // Skip auth if explicitly requested
  if (config.skipAuth) return config;

  let accessToken = localStorage.getItem("access"); // changed to localStorage

  // Refresh token if expired or missing
  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      const refreshToken = localStorage.getItem("refresh"); // changed to localStorage
      if (!refreshToken) throw new Error("No refresh token found");

      const res = await publicAxios.post("/refresh", { refreshToken });
      accessToken = res.data.accessToken;
      localStorage.setItem("access", accessToken); // store new token
    } catch (err) {
      console.error("Refresh token failed:", err);
      localStorage.clear(); // clear all tokens
      window.location.href = "/login"; // auto logout
      return Promise.reject(err);
    }
  }

  // Attach Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

// Optional: response interceptor for logging/debug
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request:", error.response.data);
    }
    return Promise.reject(error);
  }
);
