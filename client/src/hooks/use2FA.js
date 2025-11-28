
// import { useState } from "react";
// import { axiosClient } from "../api/axios";


// export function use2FA() {
//   const [faLoading, setFaLoading] = useState(false);
//   const [faError, setFaError] = useState(null);

 
//   const setup2FA = async () => {
//     try {
//       setFaLoading(true);
//       setFaError(null);

//       console.log("Requesting 2FA setup...");
//       const res = await axiosClient.post(`/2fa/setup`, {}, );


//       return res.data?.data;
//     } catch (err) {
//       const msg = err?.response?.data?.message || "2FA setup failed";
//       setFaError(msg);
//       console.error("Setup 2FA error:", err?.response?.data);
//       return { error: msg };
//     } finally {
//       setFaLoading(false);
//     }
//   };

 
//   const verifyAndEnable2FA = async (payload) => {
//     try {
//       setFaLoading(true);
//       setFaError(null);

//       console.log("Verifying and enabling 2FA with payload:", payload);
//       const res = await axiosClient.post(`/2fa/verify`, payload);

//       return res.data;
//     } catch (err) {
//       const msg = err?.response?.data?.message || "2FA verification failed";
//       setFaError(msg);
//       console.error("Verify 2FA error:", err?.response?.data);
//       return { error: msg };
//     } finally {
//       setFaLoading(false);
//     }
//   };


//   const disable2FA = async (payload) => {
//     try {
//       setFaLoading(true);
//       setFaError(null);

   

//       const res = await axiosClient.post(`/2fa/disable`, payload);
// console.log(res)
//       return res.data;
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Failed to disable 2FA";

//       if (err?.response?.status === 401) {
//         console.error("Unauthorized: Token may be missing or expired");
//       } else {
//         console.error("Disable 2FA error:", err?.response?.data);
//       }

//       setFaError(msg);
//       return { error: msg };
//     } finally {
//       setFaLoading(false);
//     }
//   };

//   return { faLoading, faError, setup2FA, verifyAndEnable2FA, disable2FA };
// }


// src/hooks/use2FA.js
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { axiosClient } from "../api/axios";
import { useAuth } from "./useAuth";

export function use2FA() {
  const [faLoading, setFaLoading] = useState(false);
  const [faError, setFaError] = useState(null);
  const { auth, setUser } = useContext(AuthContext);
  const {getUser}=useAuth()

  const setup2FA = async () => {
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/setup`, {});
    //   await getUser()
      return res.data?.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA setup failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  const verifyAndEnable2FA = async (payload) => {
    console.log(payload,'2fa load')
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/verify`, payload);
    //   console.log(res,'verify')
    //   if (res.data?.user) setUser(res.data.user);
    await getUser()
    console.log(res.data)
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "2FA verification failed";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  const disable2FA = async (payload) => {
    try {
      setFaLoading(true);
      setFaError(null);
      const res = await axiosClient.post(`/2fa/disable`, payload);
    //   console.log(res)
    //   if (res.data?.user) setUser(res.data.user);
    await getUser()
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to disable 2FA";
      setFaError(msg);
      return { error: msg };
    } finally {
      setFaLoading(false);
    }
  };

  return { faLoading, faError, setup2FA, verifyAndEnable2FA, disable2FA };
}
