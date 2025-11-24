// src/api/axios.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api/auth";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // if your backend uses cookies for refresh tokens
});

export default axiosInstance;

