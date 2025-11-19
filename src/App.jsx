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

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route element={<AuthMiddleware />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
