import styles from './AuthUserModal.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function AdminUserModal({ onClose, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/createUser', {
                username,
                password,
                role
            });
            if (response.status === 200) {
                setSuccess('User authorized successfully');
                setError('');
                setUsername('');
                setPassword('');
                setRole('user'); // Reset role to default
                onSuccess(); // Call the success handler to refresh user list
                onClose(); // Close the modal
            } else {
                setError('Failed to authorize user');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error authorizing user:', error);
            setError('Error authorizing user. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Authorize New User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Authorize User</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </div>
        </div>
    );
}