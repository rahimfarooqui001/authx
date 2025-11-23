import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";

export default function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        if (auth?.access) {
          config.headers.Authorization = `Bearer ${auth.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // try refresh
          try {
            const resp = await api.post("/api/auth/refresh", {}, { withCredentials: true });
            const { access, refresh } = resp.data.data || resp.data;
            if (access) {
              setAuth((prev) => ({ ...prev, access }));
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return api(originalRequest);
            }
          } catch (e) {
            setAuth({ user: null, access: null });
            return Promise.reject(e);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [auth, setAuth]);

  return api;
}
