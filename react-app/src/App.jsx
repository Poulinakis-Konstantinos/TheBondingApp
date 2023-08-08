import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Register from './pages/Register';
import User from './pages/User';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Clients from "./pages/Clients";
import { DateProvider } from './DateContext';

import "./App.css";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      try {
        const decodedToken = jwt_decode(token);
        const usernameFromToken = decodedToken.sub;
        setUsername(usernameFromToken); 
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn ? (
        <>
        <DateProvider>
          <Navigation username={username} handleLogout={handleLogout}/>
          <Routes>
            <Route path="/Details/:bondId" element={<Details />} />
            <Route path="/" element={<Home  />} />
            <Route path="/user" element={<User username={username} />} />
            <Route path="/HomePageTest"element={<HomePage />} />
            <Route path="/myClients"element={<Clients />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
          </DateProvider>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;