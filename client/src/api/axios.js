





// src/utils/axios.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;
console.log(import.meta.env.VITE_API_BASE_URL,'url backedn')


export const publicAxios = axios.create({
  baseURL: API_BASE,
});


export const axiosClient = axios.create({
  baseURL: API_BASE,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000; 
};

axiosClient.interceptors.request.use(async (config) => {
  if (config.skipAuth) return config;

  let accessToken = localStorage.getItem("access"); 

  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      const refreshToken = localStorage.getItem("refresh"); 
      if (!refreshToken) throw new Error("No refresh token found");

      const res = await publicAxios.post("/refresh", { refreshToken });
      accessToken = res.data.accessToken;
      localStorage.setItem("access", accessToken); 
    } catch (err) {
      console.error("Refresh token failed:", err);
      localStorage.clear(); 
      window.location.href = "/login"; 
      return Promise.reject(err);
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request:", error.response.data);
    }
    return Promise.reject(error);
  }
);
