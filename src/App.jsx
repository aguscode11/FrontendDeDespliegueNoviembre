import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import AuthMiddleware from './Middleware/AuthMiddleware'
import AuthContextProvider, { AuthContext } from './Context/AuthContext'
import './App.css';
import ProtectedRoute from "./Components/ProtectedRoute"
import PublicRoute from "./Components/PublicRoute"


function App() {
  return (
    <>
      <div className="App">
        <Navbar />

        <Routes>

          {/* Rutas públicas (solo si NO estás logueado) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Route>

          {/* Rutas protegidas (solo si estás logueado) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </>
  )
}

export default App