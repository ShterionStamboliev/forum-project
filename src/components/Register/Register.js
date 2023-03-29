import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";
import { UseAuth } from "../../contexts/AuthContext";
import {
    runEmailLengthError,
    runEmptyEmailField,
    runEmptyPasswordField,
    runEmptyFirstNameError,
    runEmptyLastNameError,
    runEmptyUsernameError,
    runEmptyConfirmPasswordField,
    runPasswordEqualityCheck,
    runSuccessfulRegistration,
    runPasswordLengthError
} from "../../utils/alerts";
import './Register.css'

const Register = () => {
    const { createUser } = UseAuth();
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: '',
        confirmPassword: '',
    });

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (value.email.length < 10) {
                return runEmailLengthError();
            };

            if (value.email === '') {
                return runEmptyEmailField();
            };

            if (value.password.length < 6) {
                return runPasswordLengthError();
            };

            if (value.password === '') {
                return runEmptyPasswordField();
            };

            if (value.confirmPassword === '') {
                return runEmptyConfirmPasswordField();
            };

            if (value.password !== value.confirmPassword) {
                return runPasswordEqualityCheck();
            };

            if (value.firstName === '') {
                return runEmptyFirstNameError();
            };

            if (value.lastName === '') {
                return runEmptyLastNameError();
            };

            if (value.username === '') {
                return runEmptyUsernameError();
            };

            await createUser(value.email, value.password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    const docRef = doc(db, 'users', user.uid);
                    await setDoc(docRef, {
                        firstName: value.firstName,
                        lastName: value.lastName,
                        email: value.email,
                        username: value.username,
                        createdOn: new Date().toLocaleDateString(),
                        posts: []
                    });
                });
            runSuccessfulRegistration();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        };
    };

    return (
        <div className="register-container">
            <div>
                <h1 className="register-title">Sign Up</h1>
            </div>

            <form method="POST">

                <div className="first-name">
                    <label className="first-name-label" htmlFor="fname">First name</label>
                    <input
                        className="first-name-input"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={value.firstName}
                        onChange={handleEventSubmit}
                    />
                </div>

                <div className="last-name">
                    <label className="last-name-label" htmlFor="lname">Last name</label>
                    <input
                        className="last-name-input"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={value.lastName}
                        onChange={handleEventSubmit}
                    />
                </div>

                <div className="email">
                    <label className="email-label" htmlFor="email">Email</label>
                    <input
                        className="email-input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={value.email}
                        onChange={handleEventSubmit}
                    />
                </div>

                <div className="username">
                    <label className="username-label" htmlFor="username">Username</label>
                    <input
                        className="username-input"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={value.username}
                        onChange={handleEventSubmit}
                    />
                </div>

                <div className="password">
                    <label className="password-label" htmlFor="password">Password</label>
                    <input
                        className="password-input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={value.password}
                        onChange={handleEventSubmit}
                    />
                </div>

                <div className="confirm-password">
                    <label className="confirm-password-label" htmlFor="confirm-password">Confirm password</label>
                    <input
                        className="confirm-password-input"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={value.confirmPassword}
                        onChange={handleEventSubmit}
                    />
                </div>
                <input className="submit-btn" onClick={handleSubmit} type="submit" value="Register" />
                <p className="login-redirect">
                    Already have an account?
                    <Link to="/login" className="login-link">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;