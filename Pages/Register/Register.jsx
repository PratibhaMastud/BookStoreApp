import React, { useState } from "react";
import './Register.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import { signUpUser } from "../../Services/UserService";


const Register = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [fullNameMessage, setFullNameMessage] = useState("");
    const [fullNameFlag, setFullNameFlag] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [phoneMessage, setPhoneMessage] = useState("");
    const [phoneFlag, setPhoneFlag] = useState(false);


    const onChangefullName = (event) => {
        let fullNamePattern = "^[a-zA-Z\\s]*$";
        if (event.target.value.match(fullNamePattern)) {
            setFullName(event.target.value);
            setFullNameFlag(false);
            setFullNameMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setFullNameFlag(true);
            setFullNameMessage("Please enter full name");
            setState(true);
        } else {
            setFullNameFlag(true);
            setFullNameMessage("Please enter valid Fullname");
            setState(true);
        }
    };

    const onChangeEmail = (event) => {
        let emailPattern = "^([a-zA-Z0-9_.$*&!+-]+)@([a-z0-9]+).([a-z.]{2,7})$";
        if (event.target.value.match(emailPattern)) {
            setEmail(event.target.value);
            setEmailFlag(false);
            setEmailMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setEmailFlag(true);
            setEmailMessage("Please enter email-Id");
            setState(true);
        } else {
            setEmailFlag(true);
            setEmailMessage("Please enter valid email");
            setState(true);
        }
    };

    const onChangePassword = (event) => {
        let passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@$%^&(){}:;<>,.?/~_+=|-]).{8,}$";
        if (event.target.value.match(passwordPattern)) {
            setPassword(event.target.value);
            setPasswordFlag(false);
            setPasswordMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setPasswordFlag(true);
            setPasswordMessage("Please enter password");
            setState(true);
        } else {
            setPasswordFlag(true);
            setPasswordMessage("Please enter valid password");
            setState(true);
        }
    };
    const loginForm = () => {
        props.history.push("/login");
    }
    const onChangePhone = (event) => {
        let phonePattern = "^[1-9]{1}[0-9]{9}$";
        if (event.target.value.match(phonePattern)) {
            setPhone(event.target.value);
            setPhoneFlag(false);
            setPhoneMessage("");
            setState(false);
        } else if (event.target.value.length < 1) {
            setPhoneFlag(true);
            setPhoneMessage("Please enter phone number");
            setState(true);
        } else {
            setPhoneFlag(true);
            setPhoneMessage("Please enter phone number");
            setState(true);
        }
    };
    console.log(fullName + "" + email + "" + password);

    const registerForm = (props) => {

        if (email.length === 0) {
            setEmailMessage("required");
            setEmailFlag(true);
        }
        if (fullName.length === 0) {
            setFullNameMessage("Please enter full name");
            setFullNameFlag(true);
        }

        if (password.length === 0) {
            setPasswordMessage("required");
            setPasswordFlag(true);
        }
        if (phone.length === 0) {
            setPhoneMessage("required");
            setPhoneFlag(true);
        }

        if (
            fullName.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            phone.length > 0
        ) {
            if (!fullNameFlag && !emailFlag && !passwordFlag && !phoneFlag) {
                const signUpData = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    phone: phone
                }
                signUpUser(signUpData)
                .then((response) => {
                    console.log(response.data);
                    props.history.push("/login");
                }).catch((error) => {
                    console.log(error);
                })
                console.log(signUpData);
            }
        }
    };

    return (
        <Form className="boot-reg needs-validation" novalidate>
            <div className="text-center">
                <h4 className="color-Reg text-light h-4 w-100 p-3">Bookstore App</h4>
            </div>

            <div className="text-center">
                <h5>
                    <span className="font-weight-bold color-title-reg mt-2">Sign up</span>
                </h5>
            </div>
            <div className="textfield-reg">
                <Input type="text" name="fullName" id="fullName" placeholder="Full Name" onChange={onChangefullName} required />
            </div>
            <div className="span-reg">
                <span style={{ color: "red" }}>{fullNameMessage}</span>
            </div>
            <div className="textfield-reg">
                <Input type="email" name="email" id="email" placeholder="Username" onChange={onChangeEmail} required />
            </div>
            <div className="span-reg">
                <span style={{ color: "red" }}>{emailMessage}</span>
            </div>
            <div className="textfield-reg">
                <Input type="password" name="password" id="password" placeholder="Password " onChange={onChangePassword} required />
            </div>
            <div className="span-reg">
                <span style={{ color: "red" }}>{passwordMessage}</span>
            </div>
            <div className="textfield-reg">
                <Input type="number" name="phone" id="phone" placeholder="Phone" onChange={onChangePhone} required />
            </div>
            <div className="span-reg">
                <span style={{ color: "red" }}>{phoneMessage}</span>
            </div>
            <div className="textfield-reg">
                <Button className="btn color-Reg  text-light btn-block" onClick={registerForm}>Sign up</Button>
            </div>
            
            <div className="textSignup">
                <span style={{ color: "blue" }} onClick={loginForm}>Sign in...</span>
            </div>
        </Form>
        // </div>

    );
}
export default withRouter(Register);