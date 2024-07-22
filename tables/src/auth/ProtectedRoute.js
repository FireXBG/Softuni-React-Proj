import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext'; // Ensure this matches the filename

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
