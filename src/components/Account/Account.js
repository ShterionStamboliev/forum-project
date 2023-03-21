import React from 'react';
import './Account.css';
import { UseAuth } from '../../contexts/AuthContext';

const Account = () => {
    const { user } = UseAuth();

  return (
    <div className='account-container'>
        <h1 className='account-title'>Account</h1>
        <p>User Email: {user && user.email}</p>
    </div>
  );
};

export default Account