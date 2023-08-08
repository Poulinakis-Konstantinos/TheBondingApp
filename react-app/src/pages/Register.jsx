import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLoggedIn, setUsername }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = {
      userName: userName,
      password: password,
    };

    // Send the registration request to API
    axios.post('http://localhost:8080/api/users', userData, {
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Reject only if the status code is not in this range
      }
    })
    .then((response) => {
      console.log('Registration successful!');
      // Grab the token from the response and save it in local storage
      const token = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwt_decode(token);
      const usernameFromToken = decodedToken.sub;
      
    
      setIsLoggedIn(true);
      navigate('/');
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      if (error.response && error.response.data) {
        alert(error.response.data);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    });
    
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4 pt-5">
              <img
                src="/images/logo_square_rgb.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Db logo"
              /> 
              <span className="h1 fw-bold mb-0" style={{color:"#1620a8"}}> Bonds Tracker </span>
            </div>
    
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{width: "23rem"}}>
                <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Register</h3>
                <div className="form-outline mb-4">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      aria-label="Email"
                      className="form-control-lg"
                      aria-describedby="basic-addon1"
                      placeholder="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </InputGroup>
                </div>
    
                <div className="form-outline mb-4">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="password"
                      aria-label="password"
                      className="form-control-lg"
                      aria-describedby="basic-addon1"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </div>
    
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="button"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
    
                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="">Forgot password?</a></p>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
    
              </form>
    
            </div>
    
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="/images/login.jpg"
              alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
              Photo by <a href="https://unsplash.com/@jeffreyblum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeffrey Blum</a> on <a href="https://unsplash.com/photos/7-gaPkhIgqs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
