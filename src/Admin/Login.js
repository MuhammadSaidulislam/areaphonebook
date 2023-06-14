import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddService from "./AddService";
import './Login.css'

const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "admin",
            password: "admin"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error"><p>{errorMessages.message}</p></div>
        );

    const renderForm = (
        <>
            <div className="loginForm">
            <Container>
                <div className="screen">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleSubmit}>
                            <div className="login__field">
                                <input name="uname" type="text" className="login__input" placeholder="User name / Email" />
                                {renderErrorMessage("uname")}
                            </div>
                            <div className="login__field">
                                <input name="pass" type="password" className="login__input" placeholder="Password" />
                                {renderErrorMessage("pass")}
                            </div>
                            <button type="submit" className="button login__submit">
                                <span className="button__text">Log In Now</span>
                            </button>
                        </form>
  
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </Container>
            </div>
        </>

    );
    return (
        <>
            {isSubmitted ? <AddService/> : renderForm}
        </>
    )
}

export default Login