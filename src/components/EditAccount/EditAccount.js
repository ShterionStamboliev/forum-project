import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { db, storage } from '../../config/firebase';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';
import { UseAuth, uploadImage } from '../../contexts/AuthContext';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { runEmptyFieldAlert } from '../../utils/alerts';
import { useNavigate } from 'react-router-dom';
import Spinner from '../LoadingSpinner/Spinner';
import './EditAccount.css'
import { deleteObject, getMetadata, ref } from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete'


const EditAccount = () => {

    const { user } = UseAuth();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState({
        email: '',
        username: '',
        name: ''
    });
    const navigate = useNavigate();

    const userQuery = doc(db, 'users', user.uid);

    const dataRef = async () => {
        setIsLoading(true);
        const userRef = doc(db, 'users', user.uid);
        const userDataRef = await getDoc(userRef);
        if (userDataRef.exists()) {
            const data = [{ ...userDataRef.data(), id: userDataRef.id }]
            setUserData(data);
            setIsLoading(false);
        };
    };

    useEffect(() => {
        const controller = new AbortController();
        if (user.photoURL) {
            dataRef();
        }
        return () => controller.abort();
    }, [user]);

    useEffect(() => {
        if (user?.photoURL) {
            setImageUrl(user.photoURL);
        };
    }, [user]);

    // const handleImageChange = (e) => {
    //     e.preventDefault();
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     };
    // };

    // const handleSubmit = () => {
    //     uploadImage(image, user).then(() => {
    //         Swal.fire({
    //             title: 'Your avatar is set!',
    //             showClass: {
    //                 popup: 'animate__animated animate__fadeInDown'
    //             },
    //             hideClass: {
    //                 popup: 'animate__animated animate__fadeOutUp'
    //             }
    //         });
    //     });
    // };

    // const handleUpdate = () => {
    //     if (value.email === '' || value.username === '' || value.name === '') {
    //         runEmptyFieldAlert();
    //         return;
    //     };

    //     try {
    //         updateDoc(userQuery, {
    //             email: value.email,
    //             username: value.username,
    //             name: value.name
    //         }).then(() => {
    //             Swal.fire({
    //                 title: 'Do you want to save the changes?',
    //                 showDenyButton: true,
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Save',
    //                 denyButtonText: `Don't save`,
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     Swal.fire('Saved', '', 'success')
    //                         .then(() => navigate('/forum'))
    //                 } else if (result.isDenied) {
    //                     Swal.fire('Cancelled', '', 'info')
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //     };
    // };

    // const handleEventSubmit = (e) => {
    //     setValue({ ...value, [e.target.name]: e.target.value });
    // };

    // const handleDelete = () => {
    //     const fileRef = ref(storage, `${user.uid}/images/`);
    //     getMetadata(fileRef).then(() => {
    //         deleteObject(fileRef).then(async () => {
    //             const userRef = doc(db, 'users', user.uid);
    //             const swalWithBootstrapButtons = Swal.mixin({
    //                 customClass: {
    //                     confirmButton: 'btn btn-success',
    //                     cancelButton: 'btn btn-danger'
    //                 },
    //                 buttonsStyling: false
    //             })
    //             swalWithBootstrapButtons.fire({
    //                 title: 'Are you sure?',
    //                 text: "You won't be able to revert this!",
    //                 icon: 'warning',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Remove avatar',
    //                 cancelButtonText: 'Cancel',
    //                 reverseButtons: true
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     updateDoc(userRef, {
    //                         photo: deleteField()
    //                     });
    //                     swalWithBootstrapButtons.fire(
    //                         'Deleted!',
    //                         'Avatar removed',
    //                         'success'
    //                     )
    //                 } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                     swalWithBootstrapButtons.fire(
    //                         'Cancelled',
    //                         'error'
    //                     );
    //                 };
    //             });

    //         }).catch((error) => {
    //             console.log(error.message);
    //         });
    //     });
    // };

    return (
        <div className='account-wrapper'>
            <div className="account-info-wrapper">
                {/* <div className="account-image">
                    <Avatar className="user-avatar"
                        src={imageUrl}
                        sx={{ width: 90, height: 90 }}
                    />
                </div>

                <Stack className='upload-img' direction="row" alignItems="center" spacing={2}>
                    <IconButton onChange={handleImageChange} className='upload-img' color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </Stack>

                <Stack className='submit-img' direction="row" spacing={2}>
                    <Button onClick={handleSubmit}
                        sx={{
                            fontSize: '12px',
                            borderRadius: '50px',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        variant="contained" endIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                </Stack> */}

                {/* <Stack className='remove-img' direction="row" spacing={2}>
                    <Button onClick={handleDelete} variant="outlined" sx={{ backgroundColor: '#1976d2', color: 'white' }} startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                </Stack> */}

                {/* <Stack className='submit-account-profile' direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleUpdate}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            fontSize: '12px',
                            borderRadius: '50px',
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                        Submit
                    </Button>

                </Stack> */}

                {isLoading ? <Spinner /> : Object.values(userData).map((u) => {
                    return <React.Fragment>
                        <div className="edit-currentuser-username">
                            <input
                                type="text"
                                // onChange={handleEventSubmit}
                                // value={u.username}
                                className='update-username'
                                name='username'
                                id='update-username'
                                placeholder='Update username...' />
                        </div>

                        <div className="edit-user-info">
                            Edit profile
                        </div>

                        <div className="edit-email-icon">
                            E-mail
                        </div>

                        <div className="edit-account-username">
                            Username
                        </div>

                        <div className="edit-account-email">
                            <input
                                type="email"
                                // onChange={handleEventSubmit}
                                // value={u.email}
                                className='update-email'
                                name='email'
                                id='update-email'
                                placeholder='Update email...' />
                        </div>

                        <div className="edit-account-user-icon">
                            Name
                        </div>

                        <div className="edit-account-name">
                            <input type="text"
                                // onChange={handleEventSubmit}
                                // value={u.name}
                                className='update-name'
                                name='name'
                                id='update-name'
                                placeholder='Update name...' />
                        </div>

                    </React.Fragment>
                })};
            </div>
        </div>
    )
};
export default EditAccount;