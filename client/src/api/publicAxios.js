import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const publicAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
