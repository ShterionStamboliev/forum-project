import { Link } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';
import Logout from '../Logout/Logout';
import './Navigation.css';

const UserAuth = () => {
    const { user} = UseAuth();

    return (
        <header className='nav__box'>
            <Link to='/'>
                <span className='nav__home'>Home</span>
            </Link>
            {user ?
                <nav className='nav__links'>
                    <ul className='auth__buttons'>
                        <li className='create__button'><Link to='/create-thread'>Create Post</Link></li>
                        <li className='forum__page'><Link to='/forum'>Forum page</Link></li>
                        <li className='user__greeting'>{`Welcome, ${user.email}`}</li>
                        <li className='account__page'><Link to='/account'>Account</Link></li>
                        <Logout />
                        
                    </ul>
                </nav> :
                <nav className='nav__links'>
                    <ul>
                        <li className='guest__forum__page' style={{ marginRight: '650px' }}><Link to='/forum'>Forum page</Link></li>
                        <li className='nav__button'><Link to='/login'>Login</Link></li>
                        <li className='nav__button'><Link to='/register'>Register</Link></li>
                    </ul>
                </nav>}
        </header>
    );
};

export default UserAuth;
