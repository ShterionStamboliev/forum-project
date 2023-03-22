import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2';
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
            if (value.email === '' && value.password === '') {
                return Swal.fire({
                    icon: 'error',
                    title: 'You cannot leave empty fields!',
                });
            };
            await signInUser(value.email, value.password);
            onLoginSuccess();
            navigate('/');
        } catch (error) {
            alert(error.message)
        }
    };

    return (
        <div className="login-container">
            <div>
                <h1 className="login-title">Sign In</h1>
            </div>

            <form method="POST">

                <div className="email">
                    <label className="email-label" htmlFor="email">Email</label>
                    <input className="email-input" name="email" type="email" placeholder="Email" value={value.email} onChange={handleEventSubmit} />
                </div>

                <div className="password">
                    <label className="password-label" htmlFor="password">Password</label>
                    <input className="password-input" name="password" type="password" placeholder="Password" value={value.password} onChange={handleEventSubmit} />
                </div>

                <input className="submit-btn"  onClick={handleSignIn} type="submit" value="Log in" />
                <p className="register-redirect">
                    Don't have an account?
                    <Link to="/register" className="register-link"> Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;