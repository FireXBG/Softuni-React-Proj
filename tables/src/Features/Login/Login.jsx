import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../auth/authContext';
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', { password });
            if (response.status === 200) {
                login(response.data.token);
            } else {
                console.error('Login failed');
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again.');
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        navigate('/admin/login');
    };

    return (
        <div className={styles.login__container}>
            <h1>Restaurant System Login</h1>
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <button onClick={handleAdminLogin}>Admin Login</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
