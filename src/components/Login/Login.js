import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { signInUser } = UseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            await signInUser(email, password);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="login-container">
            <div>
                <h1 className="login-title">Sign In</h1>
            </div>

            <form method="POST" onSubmit={handleSignIn}>

                <div className="email">
                    <label className="email-label" htmlFor="email">Email</label>
                    <input className="email-input" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="password">
                    <label className="password-label" htmlFor="password">Password</label>
                    <input className="password-input" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <input className="submit-btn" type="submit" value="Log in" />
                <p className="register-redirect">
                    Don't have an account?
                    <Link to="/register" className="register-link"> Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;