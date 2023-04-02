import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { UseAuth, uploadImage } from '../../contexts/AuthContext';
import './Account.css';
import { deleteObject, getMetadata, ref } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Account = () => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    };
  };

  const handleSubmit = async () => {
    uploadImage(image, user, setLoading);
  };

  const handleDelete = () => {
    const fileRef = ref(storage, `${user.uid}/images/`);
    getMetadata(fileRef).then((res) => {
      console.log(res);
      deleteObject(fileRef).then(async () => {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          photo: deleteField()
        });
        alert('Image deleted successfully')
      }).catch((error) => {
        console.log(error.message);
      });
    });
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL)
    };
  }, [user]);

  return (
    <div className='account-wrapper'>
      <div className="account-info-wrapper">
        <div className="account-image">
          <Avatar className="user-avatar"
            src={imageUrl}
            sx={{ width: 120, height: 120 }}
          />
          {/* <button disabled={loading || !image} onClick={handleSubmit}>Submit</button> */}
          {/* <button disabled={image} onClick={handleDelete}>Remove avatar</button> */}
        </div>

        <Stack className='upload-img' direction="row" alignItems="center" spacing={2}>
          <IconButton className='upload-img' color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera onChange={handleImageChange} />
          </IconButton>
        </Stack>

        <Stack className='submit-img' direction="row" spacing={2}>
          <Button onChange={handleSubmit} variant="contained" endIcon={<CloudUploadIcon />}>
            Upload
          </Button>
        </Stack>

        <div className="account-threads">
          Active threads: 0
        </div>
      </div>
    </div>
  );
};

export default Account