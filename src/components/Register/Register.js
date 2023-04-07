import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";
import { UseAuth } from "../../contexts/AuthContext";
import {
    runEmailLengthError,
    runEmptyEmailField,
    runEmptyPasswordField,
    runEmptyUsernameError,
    runEmptyConfirmPasswordField,
    runPasswordEqualityCheck,
    runSuccessfulRegistration,
    runPasswordLengthError,
    runEmptyNameError
} from "../../utils/alerts";
import './Register.css'
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { createUser } = UseAuth();
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
        password: '',
        name: '',
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

            if (value.name === '') {
                return runEmptyNameError();
            };

            if (value.username === '') {
                return runEmptyUsernameError();
            };

            await createUser(value.email, value.password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    const docRef = doc(db, 'users', user.uid);
                    await setDoc(docRef, {
                        name: value.name,
                        email: value.email,
                        username: value.username,
                        createdOn: new Date().toLocaleDateString(),
                        posts: []
                    });
                    updateProfile(user, {
                        displayName: value.name
                    });
                    runSuccessfulRegistration();
                    navigate('/');
                });
        } catch (error) {
            console.log(error.message);
        };
    };

    return (
        <div className="register-body">

            <div className="register-container">
                <div>
                    <h1 className="register-title">Sign Up</h1>
                </div>

                <form method="POST">

                    <div className="first-name">
                        <label className="first-name-label" htmlFor="fname">Name</label>
                        <input
                            className="first-name-input"
                            name="name"
                            type="text"
                            placeholder="First name"
                            value={value.name}
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
            
        </div>
    );
};

export default Register;