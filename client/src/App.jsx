import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import TwoFASetup from './pages/TwoFASetup'
import VerifyEmailPending from './pages/VerifyEmailPending'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/2fa" element={<TwoFASetup />} />
        <Route path="/verify-email" element={<VerifyEmailPending />} />


       
      </Routes>

    </div>
  )
}

export default App

