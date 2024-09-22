import React, {useEffect, useState} from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";


// components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:4000/api/auth/verify",{
        method:"GET",
        headers:{token:localStorage.token}
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.error(error.message);
      
    }
  }
  useEffect(() => {
    isAuth()
  })
  return (
    <>
    <Router>
      <div className="container">
      <Routes>
        <Route path='/' element={!isAuthenticated ? <LandingPage/> : <Navigate to ="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth = {setAuth}/> : <Navigate to="/dashboard" />}/>
        <Route path="/register" element={!isAuthenticated ? <Register setAuth = {setAuth}/> : <Navigate to="/login" />}/>
        <Route path="/dashboard" element={isAuthenticated ?<Dashboard setAuth = {setAuth}/> : <Navigate to="/login"/>}/>
      </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
