import styles from './ChangePassModal.module.css';
import {useState} from 'react';
import axios from 'axios';
import SuccessOperation from '../../../../Core/SuccessOperation/SuccessOperation';

export default function ChangePassModal({user, onClose}) {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/api/auth/changePassword`, {
                userId: user._id,
                newPassword: newPassword
            });
            if (response.status === 200) {
                setError('');
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                onClose(true);
            } else {
                setError('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Error changing password. Please try again.');
        }
    };

    return (
        <>
            {showSuccess && <SuccessOperation/>}
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2 className={styles.main__heading}>Change Password for {user.username}</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <div className={styles.button__wrapper}>
                            <button type="submit" className="button__1">Change Password</button>
                            <button type="button" className="button__1" onClick={() => {
                                setError('');
                                onClose(false);
                            }}>Cancel
                            </button>
                        </div>

                    </form>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </>
    );
}
