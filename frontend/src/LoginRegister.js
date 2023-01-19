import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import { Login } from "./Login";
import { Register } from "./Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [currentForm, setCurrentForm] = useState('login');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate();

  // if(isLoggedIn)
  //   navigate("/homepage")
  useEffect(()=>{
    if(isLoggedIn)
      navigate("/homepage");
  }, [isLoggedIn])

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>  
  );
}

export default LoginRegister;
