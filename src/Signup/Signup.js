import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Modal } from "react-bootstrap";
import { loginUser, mobileOtp, numberCheck, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Layout from './../Component/Layout/Layout';

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [phone, setPhone] = useState(false);
  const [otpNumber, setOtpNumber] = useState(false);
  const [pass, setPass] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpWrong, setOtpWrong] = useState(false);
  const [validLogin, setValidLogin] = useState(false);
  const [otpShow, setOtpShow] = useState("");
  const [numberValid, setNumberValid] = useState(false);
  const [numberValue, setNumberValue] = useState(false);

  function generateRandomNumber() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleShow = () => {
    if (userMobile.length === 0) {
      setNumberValue(true);
    } else {
      numberCheck(userMobile).then((data) => {
        if (data.exists === true) {
          setShow(true);
          setNumberValid(true);
          setNumberValue(false);
          setOtpNumber(false);
          setPass(false)
        } else {
          setShow(true);
          setNumberValid(false);
          setNumberValue(false);
          setOtpNumber(true);
          //  otp number
          const randomNumber = generateRandomNumber();
          setOtpShow(randomNumber);
          setOtpCode(randomNumber);
          // mobileOtp(mobile,randomNumber);
        }
      });
    }
  };

  const numberSave = () => {
    setPhone(false);
    setOtpNumber(true);
    const randomNumber = generateRandomNumber();
    setOtpShow(randomNumber);
    setOtpCode(randomNumber);
    // mobileOtp(mobile,randomNumber);
  };
  const otpSave = () => {
    if (String(otpCode) === otpValue) {
      setOtpNumber(false);
      setPass(true);
      setOtpWrong(false);
    } else {
      setOtpWrong(true);
    }
  };
  const loginSave = () => {
    registerUser(userMobile, password).then((data) => {
       console.log("register", data);
       if(!data.error){
        localStorage.setItem("areaphonebook", JSON.stringify(data));
        return navigate("/profile");
       }
       
    });
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

  const loginApi = () => {
    loginUser(userMobile, userPassword).then((data) => {
      if (!data.error) {
        localStorage.setItem("areaphonebook", JSON.stringify(data));
        return navigate("/profile");
      } else {
        setValidLogin(true);
      }
    });
  };

  return (
    <Layout>
      <section className="loginBox">
        <div className="app">
          <form>
            <h1>Welcome</h1>
            <div className="inputs">
              <input
                type="text"
                onChange={handleMobile}
                name=""
                placeholder="Mobile number"
              />
              {numberValue ? <span>Enter valid number</span> : <></>}
            </div>
          </form>

          <div className="loginFooter">
            {/*    <button onClick={loginApi}>Continue</button> */}
            <button onClick={handleShow}>Next</button>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="number">
            {numberValid ? (
              <>
                <label id="mobile">Enter your password</label> <br />
                <input
                  type="password"
                  onChange={handlePass}
                  name=""
                  placeholder="password"
                />{" "}
                <br />
                {validLogin ? <span>Invalid information</span> : <></>} <br />
                <button onClick={loginApi}>Login</button>
              </>
            ) : (
              <></>
            )}
            {phone ? (
              <>
                <label id="mobile">Enter your mobile number</label> <br />
                <input
                  type="text"
                  onChange={handleMobileChange}
                  placeholder="Mobile number"
                />{" "}
                <br />
                <span>Example: 0178454512</span> <br />
                <button className="btn" onClick={numberSave}>
                  Login
                </button>
              </>
            ) : (
              <></>
            )}

            {otpNumber ? (
              <>
                <label id="mobile">Enter your OTP number</label> <br />
                <input
                  type="text"
                  onChange={handleOtp}
                  placeholder="OTP number"
                />
                <br />
                <span>{otpShow}</span> <br />
                {otpWrong ? (
                  <>
                    <span>This code is not correct</span>
                  </>
                ) : (
                  <></>
                )}
                <br />
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
                <input
                  type="password"
                  onChange={handlePassChange}
                  placeholder="Password"
                />{" "}
                <br />
                <span>Password must be 6 letter or bigger</span> <br />
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
    </Layout>
  );
};

export default Signup;
