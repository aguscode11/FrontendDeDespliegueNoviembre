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
    <AuthContextProvider>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          {/* Rutas protegidas por AuthMiddleware */}
          <Route element={<AuthMiddleware />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </AuthContextProvider>
  )
}

export default App

/* function App() {


  return (
   <div>
    <Routes>
      <Route path="/" element={<LoginScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route element={<AuthMiddleware/>} >
        <Route path='/home' element={<HomeScreen/>}/>
        <Route path='/workspace/:workspace_id' element={<WorkspaceScreen/>}/>
        <Route path='/workspace/:workspace_id/:channel_id' element={<WorkspaceScreen/>}/>
      </Route>
    </Routes>
   </div>
  )
}

export default App
 */