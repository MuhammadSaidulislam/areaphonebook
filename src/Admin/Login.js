import React from 'react'
import './Login.css'
import { useState } from 'react'
import { loginAdmin } from '../api/auth';
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const handleName=(e)=>{
    setName(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  const adminLogin=()=>{
    loginAdmin(name,password).then((data)=>{
      console.log('admin',data);
      if(data.message){
        return navigate("/dashboard")
      }
    })
  }
  return (
    <>
    <div className="adminLogin">
      <div className="loginForm">
        <div className="screen">
          <div className="screen__content">
            <div className="login">
              <div className="login__field">
                <input
                  name="uname"
                  type="text"
                  onChange={handleName}
                  className="login__input"
                  placeholder="User name / Email"
                />
              </div>
              <div className="login__field">
                <input
                  name="pass"
                  type="password"
                  onChange={handlePassword}
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text" onClick={adminLogin}>Log In Now</span>
              </button>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Login