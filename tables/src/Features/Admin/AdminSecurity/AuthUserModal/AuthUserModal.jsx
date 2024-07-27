import styles from './AuthUserModal.module.css';
import {useState} from 'react';
import axios from 'axios';
import SuccessOperation from '../../../../Core/SuccessOperation/SuccessOperation';

export default function AdminUserModal({onClose, onSuccess}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/createUser', {
                username,
                password,
                role
            });

            if (response.status === 201) {
                setError('');
                setUsername('');
                setPassword('');
                setRole('user'); // Reset role to default
                onSuccess(); // Call the success handler to refresh user list
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onClose(); // Close the modal after showing success message
                }, 3000); // Hide success message after 3 seconds
            } else {
                setError('Failed to authorize user');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error authorizing user. Please try again.');
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            {showSuccess && <SuccessOperation/>}
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
                    <button type="button" onClick={() => {
                        setError('');
                        onClose();
                    }}>Cancel
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}
