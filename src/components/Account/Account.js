import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { UseAuth, uploadImage } from '../../contexts/AuthContext';
import './Account.css';

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

  const handleSubmit = () => {
    uploadImage(image, user, setLoading);
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