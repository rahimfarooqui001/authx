


import { useContext, useMemo } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export function useAxiosAuth() {
  const { auth, setAuth, logout } = useContext(AuthContext);

  const axiosAuth = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
    });

    let isRefreshing = false;
    let queue = [];

 
    instance.interceptors.request.use(
      (config) => {
       
        if (config._skipInterceptor) return config;

        if (!config.skipAuth && auth?.access) {
          config.headers.Authorization = `Bearer ${auth.access}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

   
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;

        if (error.response?.status !== 401 || original._retry) {
          return Promise.reject(error);
        }

        original._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
          })
            .then((token) => {
              original._skipInterceptor = true;
              original.headers.Authorization = `Bearer ${token}`;
              return instance(original);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/refresh`,
            null,
            { withCredentials: true }
          );

          const newAccess = res.data?.data?.access;

          if (!newAccess) throw new Error("No token returned");

          setAuth((prev) => ({ ...prev, access: newAccess }));

          queue.forEach(({ resolve }) => resolve(newAccess));
          queue = [];
          isRefreshing = false;

          original._skipInterceptor = true;
          original.headers.Authorization = `Bearer ${newAccess}`;
          return instance(original);
        } catch (err) {
          queue.forEach(({ reject }) => reject(err));
          queue = [];
          isRefreshing = false;

          logout();
          return Promise.reject(err);
        }
      }
    );

    return instance;
  }, [auth, setAuth, logout]);

  return axiosAuth;
}
