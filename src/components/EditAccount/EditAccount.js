import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { db, storage } from '../../config/firebase';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';
import { UseAuth } from '../../contexts/AuthContext';
import { collection, deleteField, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { runEmptyFieldAlert } from '../../utils/alerts';
import { Link, useNavigate } from 'react-router-dom';
import './EditAccount.css'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete'
import { updateEmail, updateProfile } from 'firebase/auth';

const EditAccount = () => {

    const { user } = UseAuth();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [value, setValue] = useState({
        email: '',
        username: '',
        name: ''
    });
    const navigate = useNavigate();

    const userQuery = doc(db, 'users', user.uid);

    const uploadImage = () => {
        if (!image) return;

        const imageRef = ref(storage, `${user.uid}/images/`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
                setDoc(doc(db, 'users', user.uid), {
                    photo: url
                }, { merge: true })
                updateProfile(user, {
                    photoURL: url
                });
            });
        });
        setIsClicked(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        };
    };

    useEffect(() => {
        const controller = new AbortController();
        if (user?.photoURL) {
            setImageUrl(user.photoURL);
        };
        return () => controller.abort();
    }, [user]);

    const handleDelete = () => {
        const fileRef = ref(storage, `${user.uid}/images/`);
        deleteObject(fileRef).then(() => {
            const userRef = doc(db, 'users', user.uid);
            updateDoc(userRef, {
                photo: deleteField()
            });
            setIsClicked(false);
        }).catch((error) => {
            console.log(error.message);
        });
        setIsClicked(true);
    };

    const handleUpdate = () => {
        if (value.email === '' || value.username === '' || value.name === '') {
            runEmptyFieldAlert();
            return;
        };

        try {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    updateDoc(userQuery, {
                        email: value.email,
                        username: value.username,
                        name: value.name
                    }).then(() => {
                        Swal.fire('Saved', '', 'success')
                        updateEmail(user, value.email)
                            .then(() => navigate('/account'))
                    })
                } else if (result.isDenied) {
                    Swal.fire('Cancelled', '', 'info')
                    return;
                };
            });
        } catch (error) {
            console.log(error.message);
        };
    };

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    return (
        <div className="edit-account-background">

            <div className='edit-account-wrapper'>
                <div className="edit-account-info-wrapper">
                    <div className="edit-account-image">
                        <Avatar className="edit-user-avatar"
                            src={imageUrl}
                            sx={{ width: 90, height: 90 }}
                        />
                    </div>

                    <Stack className='edit-upload-img' direction="row" alignItems="center" spacing={2}>
                        <IconButton onChange={handleImageChange}
                            className='edit-upload-img'
                            color="primary"
                            aria-label="upload picture"
                            component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera sx={{ color: '#0088A9' }} />
                        </IconButton>
                    </Stack>

                    {!isClicked ?
                        <Stack className='edit-submit-img' direction="row" spacing={2}>
                            <Button onClick={uploadImage}
                                variant="contained" endIcon={<CloudUploadIcon />}
                                sx={{
                                    fontSize: '12px',
                                    borderRadius: '50px',
                                    backgroundColor: '#0088A9',
                                    ":hover": { backgroundColor: '#0099CC' }
                                }}>
                                Upload
                            </Button>
                        </Stack> :
                        <Stack className='edit-remove-img' direction="row" spacing={2}>
                            <Button onClick={handleDelete}
                                variant="outlined" startIcon={<DeleteIcon />}
                                sx={{
                                    fontSize: '12px',
                                    borderRadius: '50px',
                                    backgroundColor: '#0088A9',
                                    color: 'white',
                                    ":hover": { backgroundColor: '#0099CC' }
                                }}>
                                Remove
                            </Button>
                        </Stack>}

                    <Stack className='edit-submit-account-profile' direction="row" spacing={2}>
                        <Button onClick={handleUpdate}
                            variant="contained"
                            sx={{
                                fontSize: '12px',
                                borderRadius: '50px',
                                backgroundColor: '#0088A9',
                                color: 'white',
                                ":hover": { backgroundColor: '#0099CC' }
                            }}>
                            Submit
                        </Button>
                    </Stack>

                    <Stack className='edit-account-cancel' direction="row" spacing={2}>
                        <Link to={`/account`}>
                            <Button className='account-cancel-button'
                                variant="contained"
                                sx={{
                                    fontSize: '12px',
                                    borderRadius: '50px',
                                    backgroundColor: '#0088A9',
                                    color: 'white',
                                    ":hover": { backgroundColor: '#0099CC' }
                                }}>
                                Cancel
                            </Button>
                        </Link>
                    </Stack>

                    <div className="edit-currentuser-username">
                        <input
                            type="text"
                            onChange={handleEventSubmit}
                            value={value.username}
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
                            onChange={handleEventSubmit}
                            value={value.email}
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
                            onChange={handleEventSubmit}
                            value={value.name}
                            className='update-name'
                            name='name'
                            id='update-name'
                            placeholder='Update name...' />
                    </div>
                </div>
            </div>

        </div>
    )
};
export default EditAccount;