import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { UseAuth, uploadImage } from '../../contexts/AuthContext';
import './Account.css';
import { deleteObject, getMetadata, ref } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';

const Account = () => {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userData, setUserData] = useState([]);
    const { user } = UseAuth();

    const dataRef = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userDataRef = await getDoc(userRef);
        if (userDataRef.exists()) {
            const data = [{ ...userDataRef.data(), id: userDataRef.id }]
            setUserData(data);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        dataRef();
        return () => controller.abort();
    }, []);


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        };
    };

    const handleSubmit = async () => {
        uploadImage(image, user);
    };

    useEffect(() => {
        if (user?.photoURL) {
            setImageUrl(user.photoURL);
        };
    }, [user]);

    const handleDelete = () => {
        const fileRef = ref(storage, `${user.uid}/images/`);
        getMetadata(fileRef).then(() => {
            deleteObject(fileRef).then(async () => {
                const userRef = doc(db, 'users', user.uid);
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Remove avatar',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateDoc(userRef, {
                            photo: deleteField()
                        });
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Avatar removed',
                            'success'
                        )
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'error'
                        )
                    }
                });

            }).catch((error) => {
                console.log(error.message);
            });
        });
    };

    return (
        <div className='account-wrapper'>
            <div className="account-info-wrapper">
                <div className="account-image">
                    <Avatar onChange={handleImageChange} className="user-avatar"
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
                    <Button onClick={handleSubmit} variant="contained" endIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                </Stack>

                <Stack className='remove-img' direction="row" spacing={2}>
                    <Button onClick={handleDelete} variant="outlined" sx={{ backgroundColor: '#1976d2', color: 'white' }} startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                </Stack>

                {Object.values(userData).map((user) => {
                    return <React.Fragment key={user.id}>

                        <div className="currentuser-username">
                            {user.username}
                        </div>

                        <div className="account-threads">
                            Active threads: {user.posts.length}
                        </div>

                        <div className="user-info">
                            Profile information
                        </div>

                        <div className="email-icon">
                            E-mail
                        </div>

                        <div className="account-email">
                            {user.email}
                        </div>

                        <div className="account-user-icon">
                            Name
                        </div>

                        <div className="account-names">
                            {user.firstName} {user.lastName}
                        </div>

                    </React.Fragment>
                })};

            </div>
        </div>
    );
};

export default Account;