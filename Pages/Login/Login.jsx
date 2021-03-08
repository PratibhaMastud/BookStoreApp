import React, { useState } from "react";
import './Login.css';
import { Button, Form, Input } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { loginUser } from "../../Services/UserService";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [state, setState] = React.useState({
        open: false,
    });

    const onChangeEmail = (event) => {
        let emailPattern = "^([a-zA-Z0-9_.$*&!+-]+)@([a-z0-9]+).([a-z.]{2,7})$";
        if (event.target.value.match(emailPattern)) {
            setEmail(event.target.value);
            setEmailFlag(false);
            setEmailMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setEmailFlag(true);
            setEmailMessage("required");
            setState(true);
        } else {
            setEmailFlag(true);
            setEmailMessage("Invalid email");
            setState(true);
        }
    };

    const onChangePassword = (event) => {
        let passwordPattern =
            "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@$%^&(){}:;<>,.?/~_+=|-]).{8,}$";
        if (event.target.value.match(passwordPattern)) {
            setPassword(event.target.value);
            setPasswordFlag(false);
            setPasswordMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setPasswordFlag(true);
            setPasswordMessage("required");
            setState(true);
        } else {
            setPasswordFlag(true);
            setPasswordMessage("Invalid password");
            setState(true);
        }
    };
    const registerClick = () => {
        props.history.push("/register");
    }
    console.log(email); console.log(password);

    const loginForm = () => {
        if (email.length === 0) {
            setEmailMessage("Please enter email");
            setEmailFlag(true);
        }
        if (password.length === 0) {
            setPasswordMessage("Please enter password");
            setPasswordFlag(true);
        }
        if (email.length > 0 && password.length > 0) {
            if (!emailFlag && !passwordFlag) {
                const signInData = {
                    email: email,
                    password: password,
                }
                loginUser(signInData).
                then((response) => {
                    console.log(response.data);
                    
                    localStorage.setItem("token",response.data.result.accessToken);
                    props.history.push("/dashboard");
                  
                }).catch((error) => {
                    console.log(error);
                })
                console.log(signInData);
            }
        }
    }
    return (
        <Form className="box">
            <div className="text-center">
                <h4 className="color text-light h-4 w-100 p-3">Bookstore App</h4>
            </div>

            <div className="text-center">
                <h5>
                    <span className="font-weight-bold color-title mt-2">SignIn</span>
                </h5>
            </div>

            <div className="textfield">
                <Input type="email" name="email" placeholder="Username" onChange={onChangeEmail} required />
            </div>
            <div className="span">
                <span style={{ color: "red" }}>{emailMessage}</span>
            </div>
            <div className="textfield">
                <Input type="password" name="password" placeholder="Password " onChange={onChangePassword} required />
            </div>
            <div className="span">
                <span style={{ color: "red" }}>{passwordMessage}</span>
            </div>
            <div className="textfield">
                <Button className="btn color  text-light btn-block" onClick={loginForm}>Login</Button>
            </div>
            <div className="textSignup">
                Create new account...
                <span style={{ color: "blue" }} onClick={registerClick}>Sign up</span>
            </div>
        </Form>

    );
}
export default withRouter(Login);