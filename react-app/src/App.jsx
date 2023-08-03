import'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation';


const App = () => {
  return <> 
  <Navigation/>
    <Routes>
      <Route path="/Login" element={<Login/>} />
      <Route path="/Details/*" element={<Details/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
  </>
};

export default App;



