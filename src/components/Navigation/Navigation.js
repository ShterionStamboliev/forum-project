import { Link } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';
import Logout from '../Logout/Logout';
import './Navigation.css'

const Navigation = () => {
    const { user } = UseAuth();

    return (
        <div className="nav-grid">
            {user ?
                <div className="nav-grid-wrapper-user">
                    <div className="nav-home">
                        <Link to='/'>D4jsp</Link>
                    </div>

                    <div className="nav-create-post">
                        <Link to='/create-thread'>Create Post</Link>
                    </div>

                    <div className="nav-forum-page">
                        <Link to='/forum'>Forum page</Link>
                    </div>

                    <div className="nav-greet-user">
                        {`Welcome, ${user.displayName}`}
                    </div>

                    <div className="nav-account-page">
                        <Link to='/account'>Account</Link>
                    </div>

                    <div className="nav-logout">
                        <Logout />
                    </div>
                </div> :

                <div className="nav-grid-wrapper-guest">
                    <div className="nav-home">
                        <Link to='/'>Home</Link>
                    </div>

                    <div className="nav-forum-page">
                        <Link to='/forum'>Forum page</Link>
                    </div>

                    <div className="nav-greet-guest">
                        {`Welcome, Guest`}
                    </div>

                    <div className="nav-login-page">
                        <Link to='/login'>Login</Link>
                    </div>

                    <div className="nav-register-page">
                        <Link to='/register'>Register</Link>
                    </div>
                </div>}

        </div>
    );
};

export default Navigation;
