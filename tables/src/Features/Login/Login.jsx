import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../auth/authContext';
import styles from './Login.module.css';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/auth/users');
                setUsers(response.data);
                setSelectedUser(response.data[0]?.username || '');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                username: selectedUser,
                password
            });
            if (response.status === 200) {
                login(response.data.token);
                navigate('/dashboard'); // Assuming you have a route to navigate to after login
            } else {
                console.error('Login failed');
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again.');
        }
    };

    return (
        <div className={styles.login__container}>
            <h1>Restaurant System Login</h1>
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className={styles.user__options}
                >
                    {users.map((user) => (
                        <option key={user._id} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <div className={styles.error__container}>
                {error && <p className={`${styles.error} ${error ? styles.visible : ''}`}>{error}</p>}
            </div>
        </div>
    );
}
