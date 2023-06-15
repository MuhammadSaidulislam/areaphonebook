import React, { useState,useEffect } from "react";
import "./Signup.css";
import { Modal } from "react-bootstrap";
import { loginUser, mobileOtp, registerUser } from "../api/auth";
const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phone, setPhone] = useState(true);
  const [otpNumber, setOtpNumber] = useState(false);
  const [pass, setPass] = useState(false);

  const [mobile,setMobile]=useState("");
  const [password,setPassword]=useState("");
  const [userMobile,setUserMobile]=useState("");
  const [userPassword,setUserPassword]=useState("");
  const [otpCode,setOtpCode]=useState("");
  const [otpValue,setOtpValue]=useState("");
  const [otpWrong,setOtpWrong]=useState(false);

  function generateRandomNumber() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const numberSave = () => {
    setPhone(false);
    setOtpNumber(true);
    const randomNumber = generateRandomNumber();
    console.log(randomNumber);
    setOtpCode(randomNumber)
    // mobileOtp(mobile,randomNumber);
  };
  const otpSave = () => {
    console.log(otpCode,otpValue);
    if(String(otpCode) === otpValue){
      setOtpNumber(false);
      setPass(true);
      setOtpWrong(false)
    }
    else{
      setOtpWrong(true)
    }
    
  };
  const loginSave = () => {
    registerUser(mobile,password)
    setShow(false);
    setPass(false);
    setPhone(true);
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;
    setMobile(value);
  };
  const handlePassChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleMobile = (event) => {
    const value = event.target.value;
    setUserMobile(value);
  };
  const handlePass = (event) => {
    const value = event.target.value;
    setUserPassword(value);
  };
  const handleOtp = (event) => {
    const value = event.target.value;
    setOtpValue(value);
  };

  const loginApi=()=>{
    loginUser(userMobile,userPassword)
  }
  return (
    <>
      <section className="loginBox">
        <div className="app">
          <form>
            <h1>Welcome</h1>
            <div className="inputs">
              <input type="text" onChange={handleMobile} name="" placeholder="Mobile number" />
              <input type="password" onChange={handlePass} name="" placeholder="password" />
              {/*
            <p className="light">
                <a href="#">Forgot password?</a>
              </p>
            */}
            </div>
          </form>

          <div className="loginFooter">
            <button onClick={loginApi}>Continue</button>
            <p onClick={handleShow}>Create a account</p>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="number">
            {phone ? (
              <>
                <label id="mobile">Enter your mobile number</label> <br />
                <input type="text" onChange={handleMobileChange} placeholder="Mobile number" /> <br />
                <span>Example: 0178454512</span> <br />
                <button className="btn" onClick={numberSave}>
                  Continue
                </button>
              </>
            ) : (
              <></>
            )}
            {otpNumber ? (
              <>
                <label id="mobile">Enter your OTP number</label> <br />
                <input type="text" onChange={handleOtp} placeholder="OTP number" /> <br />
               {otpWrong ? <><span>This code is not correct</span></>:<></>} <br />
                <button className="btn" onClick={otpSave}>
                  Continue
                </button>
              </>
            ) : (
              <></>
            )}
            {pass ? (
              <>
                <label id="mobile">Enter your password</label> <br />
                <input type="password" onChange={handlePassChange} placeholder="Password" /> <br />
                <button className="btn" onClick={loginSave}>
                  Save
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
