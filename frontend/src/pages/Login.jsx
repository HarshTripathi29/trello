import React, { useState } from 'react';
import './Login.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  const handleButtonClick = async () => {
    try {
      const endpoint = isSignInForm ? '/signin' : '/signup';
      const data = isSignInForm ? { email, password } : { name, email, password };
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img src="https://illustrations.popsy.co/blue/home-office.svg" alt="Login" />
      </div>
      <div className='login'>
        <form onSubmit={(e) => { e.preventDefault(); handleButtonClick(); }} className='login-form'>
          <h1 className='login-heading'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          <p>Enter your credentials below</p>
          {!isSignInForm && <input type="text" placeholder='Full Name' className='login-input' value={name} onChange={(e) => setName(e.target.value)} />}
          <input type="text" placeholder='Email Address' className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>{errorMessage}</p>
          <button className='login-button' type="submit">{isSignInForm ? "Sign In" : "Sign Up"}</button>
          <p className='' onClick={toggleSignInForm}>{isSignInForm ? "New to WorkJam, Sign up now" : "Already have an account? Sign In"}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
