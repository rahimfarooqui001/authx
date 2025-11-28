


// src/context/AuthContext.js
// src/context/AuthContext.js
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    access: null,
    refresh: null,
    loading: true,
  });

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");

    if (access && refresh && user) {
      setAuth({
        user: JSON.parse(user),
        access,
        refresh,
        loading: false,
      });
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    if (auth.access && auth.refresh && auth.user) {
      localStorage.setItem("access", auth.access);
      localStorage.setItem("refresh", auth.refresh);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    }
  }, [auth]);

  const login = ({ user, access, refresh }) => {
    setAuth({ user, access, refresh, loading: false });
  };

  const logout = () => {
    setAuth({ user: null, access: null, refresh: null, loading: false });
    localStorage.clear();
    window.location.href = "/login";
  };

  const isAccessTokenExpired = () => {
    if (!auth.access) return true;
    const { exp } = jwtDecode(auth.access);
    return Date.now() >= exp * 1000;
  };

  const setUser = (newUser) => {
    setAuth((prev) => ({ ...prev, user: newUser }));
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, setUser, login, logout, isAccessTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

