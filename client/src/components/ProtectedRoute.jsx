import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (auth.loading) return null; // or loading screen

  if (!auth.access || !auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
