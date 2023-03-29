import { UseAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { runSignOutAlert } from '../../utils/alerts';

const Logout = () => {
    const { signOutUser } = UseAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                runSignOutAlert();
                navigate("/");
            }).catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <button onClick={handleLogout} className='logout-button'>Logout</button>
    );
};

export default Logout;