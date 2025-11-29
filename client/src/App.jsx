import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import TwoFASetup from './pages/TwoFASetup'
import VerifyEmailPending from './pages/VerifyEmailPending'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'
import Disable2FA from './pages/Disable2FA'

const App = () => {
  return (
    <div>
      

       <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/verify-email/:token" element={<VerifyEmailPending />} />
      <Route path="/2fa/disable" element={<Disable2FA />} />

      {/* 2FA VERIFY PAGE */}
      <Route path="/2fa" element={<TwoFASetup />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>

    </div>
  )
}

export default App

