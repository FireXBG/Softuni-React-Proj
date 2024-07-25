import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.post('http://localhost:3001/api/auth/verify-token');
                    const { role } = response.data;
                    setIsAuthenticated(true);
                    setRole(role);
                } catch (error) {
                    console.error('Token verification failed', error);
                    setIsAuthenticated(false);
                    setRole('');
                }
            } else {
                setIsAuthenticated(false);
                setRole('');
            }
            setIsLoading(false);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const login = async (token) => {
        try {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post('http://localhost:3001/api/auth/verify-token');
            const { role } = response.data;
            setIsAuthenticated(true);
            setRole(role);
            navigate('/tables'); // Redirect to tables regardless of role
        } catch (error) {
            console.error('Login failed', error);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
            setRole('');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        setRole('');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;