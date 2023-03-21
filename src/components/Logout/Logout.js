import { UseAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
    const { signOutUser } = UseAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
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
                    title: 'Signed out successfully'
                })
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