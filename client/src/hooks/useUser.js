import { useContext } from "react";
import { useAxiosAuth } from "../api/useAxiosAuth";
import { useState } from "react";


export function useAuth() {
  const axiosAuth = useAxiosAuth();
  const { auth, login: ctxLogin, logout: ctxLogout, setAuth } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // No storing refresh token anymore.
  const storeSession = (access, user) => {
    ctxLogin({ user, access });
  };



  const getUser = async () => {
    try {
      const res = await axiosAuth.get(`/user`);
      const user = res.data?.data || res.data?.user;

      setAuth((prev) => ({ ...prev, user }));
      return user;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load user";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };
  return{
    getUser,

  }
}

 