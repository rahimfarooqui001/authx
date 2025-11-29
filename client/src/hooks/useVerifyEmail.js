import { useState, useEffect } from "react";
import axios from "axios";
import { publicAxios } from "../api/axios";

export const useVerifyEmail = (token) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await publicAxios.post(
          `/verify-email/${token}`
        );

        setMessage(res.data.message || "Email verified successfully!");
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Invalid or expired token.");
        } else if (err.request) {
          setError("No response from server. Please try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return { loading, error, message };
};
