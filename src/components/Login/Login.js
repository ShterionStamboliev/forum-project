import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import { runEmptyEmailField, runEmptyPasswordField, runInvalidSignIn } from "../../utils/alerts";
import { onLoginSuccess } from "../../utils/alerts";
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { signInUser } = UseAuth();
    const [value, setValue] = useState({
        email: '',
        password: '',
    });

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            if (value.email === '') {
                return runEmptyEmailField();
            } else if (value.password === '') {
                return runEmptyPasswordField();
            }
            await signInUser(value.email, value.password);
            onLoginSuccess();
            navigate('/');
        } catch (error) {
            runInvalidSignIn();
            return;
        }
    };

    return (
        <div className="login-body">

            <div className="login-container">
                <div>
                    <h1 className="login-title">Sign In</h1>
                </div>

                <form method="POST">

                    <div className="email">
                        <label
                            className="email-label"
                            htmlFor="email">Email
                        </label>

                        <input
                            className="email-input"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={value.email}
                            onChange={handleEventSubmit}
                        />
                    </div>

                    <div className="password">
                        <label
                            className="password-label"
                            htmlFor="password">Password
                        </label>

                        <input
                            className="password-input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={value.password}
                            onChange={handleEventSubmit}
                        />
                    </div>

                    <input className="submit-btn" onClick={handleSignIn} type="submit" value="Log in" />
                    <p className="register-redirect">
                        Don't have an account?
                        <Link to="/register" className="register-link"> Sign up</Link>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default Login;