import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from '../../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { UseAuth } from "../../contexts/AuthContext";
import './Register.css'

const Register = () => {
    const { createUser } = UseAuth();
    const usersCollection = collection(db, "users");
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            await addDoc(usersCollection, {
                firstName,
                lastName,
                email,
                username,
                posts: [],
                createdOn: new Date(),
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    return (
        <div className="register-container">
            <div>
                <h1 className="register-title">Sign Up</h1>
            </div>

            <form method="POST" onSubmit={handleSubmit}>

                <div className="first-name">
                    <label className="first-name-label" htmlFor="fname">First name</label>
                    <input className="first-name-input" name="firstName" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="last-name">
                    <label className="last-name-label" htmlFor="lname">Last name</label>
                    <input className="last-name-input" name="lastName" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="email">
                    <label className="email-label" htmlFor="email">Email</label>
                    <input className="email-input" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="username">
                    <label className="username-label" htmlFor="username">Username</label>
                    <input className="username-input" name="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="password">
                    <label className="password-label" htmlFor="password">Password</label>
                    <input className="password-input" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="confirm-password">
                    <label className="confirm-password-label" htmlFor="confirm-password">Confirm password</label>
                    <input className="confirm-password-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <input className="submit-btn" type="submit" value="Register" />
                <p className="login-redirect">
                    Already have an account?
                    <Link to="/login" className="login-link">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;