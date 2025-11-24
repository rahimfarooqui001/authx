// src/hooks/useAdmin.js
import axios from "../api/axios";

export function useAdmin() {
  const getAdminData = async () => {
    try {
      const res = await axios.get("/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Admin access denied";
    }
  };

  return { getAdminData };
}
