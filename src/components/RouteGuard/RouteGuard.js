import React from 'react'
import { Navigate } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';

const RouteGuard = ({ children }) => {
    const { user } = UseAuth();
    if (!user) {
        return <Navigate to='/login' />
    }
    return children;
};

export default RouteGuard;