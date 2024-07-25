import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
    const { isAuthenticated, role, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;
