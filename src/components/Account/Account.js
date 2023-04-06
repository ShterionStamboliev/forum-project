import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { UseAuth } from '../../contexts/AuthContext';
import './Account.css';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Account = () => {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [userData, setUserData] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const { user } = UseAuth();

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

    const dataRef = async () => {
        try {
            const userRef = doc(db, 'users', user.uid);
            const userDataRef = await getDoc(userRef);
            if (userDataRef.exists()) {
                const data = [{ ...userDataRef.data(), id: userDataRef.id }]
                setUserData(data);
            };
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        };
    };

    useEffect(() => {
        const controller = new AbortController();
        if (user) {
            setImageUrl(user.photoURL);
            dataRef();
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

    return (
        <div className='account-wrapper'>
            <div className="account-info-wrapper">
                <div className="account-image">
                    <Avatar className="user-avatar"
                        src={imageUrl}
                        sx={{ width: 90, height: 90 }}
                    />
                </div>

                <Stack className='upload-img' direction="row" alignItems="center" spacing={2}>
                    <IconButton onChange={handleImageChange}
                        sx={{ color: '#0088A9' }}
                        className='upload-img'
                        color="primary"
                        aria-label="upload picture"
                        component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera sx={{ color: '#0088A9' }} />
                    </IconButton>
                </Stack>

                {!isClicked ?
                    <Stack className='submit-img' direction="row" spacing={2}>
                        <Button onClick={uploadImage} disabled={isClicked}
                            sx={{
                                fontSize: '12px',
                                borderRadius: '50px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#0088A9',
                                ":hover": { backgroundColor: '#0099CC' }
                            }}
                            variant="contained" endIcon={<CloudUploadIcon />}>
                            Upload
                        </Button>
                    </Stack> :
                    <Stack className='remove-img' direction="row" spacing={2}>
                        <Button onClick={handleDelete} disabled={!isClicked}
                            variant="contained"
                            sx={{
                                fontSize: '12px',
                                borderRadius: '50px',
                                backgroundColor: '#0088A9',
                                color: 'white',
                                ":hover": { backgroundColor: '#0099CC' }
                            }}
                            startIcon={<DeleteIcon />}>
                            Remove
                        </Button>
                    </Stack>}

                <Stack className='edit-account-profile' direction="row" spacing={2}>
                    <Link to={`/account/${user.uid}/edit`}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#0088A9',
                                color: 'white',
                                fontSize: '12px',
                                borderRadius: '50px',
                                ":hover": { backgroundColor: '#0099CC' }
                            }}>
                            Edit profile
                        </Button>
                    </Link>
                </Stack>

                {Object.values(userData).map((user) => {
                    return <React.Fragment key={user.id}>

                        <div className="currentuser-username">
                            {user.username}
                        </div>

                        {Object.keys(user.posts).length > 0 ?
                            <div className="account-threads">
                                Active threads: {Object.keys(user.posts).length}
                            </div>
                            : <div className="account-threads">
                                Active threads: 0
                            </div>}

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
                            {user.name}
                        </div>

                    </React.Fragment>
                })}
            </div>
        </div>
    );
};

export default Account;