import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { db, storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Account.css';

const Account = () => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const imageRef = ref(storage, `${currentUser.email}/images/${image.name + Math.random()}`);
    setLoading(true);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url);
            const userRef = doc(db, 'users', currentUser.uid);
            setDoc(userRef, {
              photoURL: url
            }, { merge: true });
            setLoading(false);
          }).catch((error) => {
            console.log(error.message, 'Error getting image URL.');
          })
      }).catch((error) => {
        console.log(error.message);
      })
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (currentUser) {
      setImageUrl(currentUser.photoURL)
    };
    return () => abortController.abort();
  }, [currentUser]);

  return (
    <div className='account-wrapper'>
      <div className="account-info-wrapper">
        <div className="account-image">
          <Avatar
            src={imageUrl}
            sx={{ width: 56, height: 56 }}
          />
          <input type="file" onChange={handleImageChange} />
          <button disabled={loading || !image} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Account