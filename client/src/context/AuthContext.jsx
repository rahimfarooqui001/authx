import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    access: null,
    refresh: null,
    loading: true,
  });

  // ---------------------------
  // Restore session on refresh
  // ---------------------------
  useEffect(() => {
    const saved = sessionStorage.getItem("auth");
    if (saved) {
      setAuth({ ...JSON.parse(saved), loading: false });
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // ---------------------------
  // Persist auth state
  // ---------------------------
  useEffect(() => {
    if (auth?.access) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  // ---------------------------
  // LOGIN (store tokens + user)
  // ---------------------------
  const login = ({ user, access, refresh }) => {
    setAuth({
      user,
      access,
      refresh,
      loading: false,
    });
  };

  // ---------------------------
  // LOGOUT (clear everything)
  // ---------------------------
  const logout = () => {
    setAuth({
      user: null,
      access: null,
      refresh: null,
      loading: false,
    });
    sessionStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

