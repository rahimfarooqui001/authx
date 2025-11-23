import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, access: null });

  useEffect(() => {
    // try to load user if access stored in session
    const stored = sessionStorage.getItem("auth");
    if (stored) setAuth(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (auth && auth.access) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  const login = (data) => {
    setAuth({ user: data.user, access: data.access });
  };

  const logout = async () => {
    // optionally revoke refresh on backend
    setAuth({ user: null, access: null });
    sessionStorage.removeItem("auth");
  };

  const value = { auth, setAuth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
