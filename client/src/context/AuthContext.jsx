

import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    access: null,
    loading: true,
  });

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setAuth((prev) => ({ ...prev, loading: false }));
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    setAuth((prev) => ({
      ...prev,
      user: parsedUser,
    }));

    silentRefresh();
  }, []);

 
  useEffect(() => {
    if (auth.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth.user]);


  const login = ({ user, access }) => {
    setAuth({
      user,
      access,
      loading: false,
    });
  };


  const logout = () => {
    setAuth({
      user: null,
      access: null,
      loading: false,
    });
  };


  const isAccessTokenExpired = () => {
    if (!auth.access) return true;
    const { exp } = jwtDecode(auth.access);
    return Date.now() >= exp * 1000;
  };


  const silentRefresh = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        logout();
        return;
      }

      const data = await res.json();
      const newAccess = data?.data?.access;

      if (!newAccess) {
        logout();
        return;
      }

      setAuth((prev) => ({
        ...prev,
        access: newAccess,
        loading: false,
      }));
    } catch {
      logout();
    }
  };

  console.log(auth.access,'access token ')
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        isAccessTokenExpired,
        silentRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
