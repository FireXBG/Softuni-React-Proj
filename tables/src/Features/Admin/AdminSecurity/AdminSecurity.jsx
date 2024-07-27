import {useEffect, useState} from 'react';
import axios from 'axios';
import ChangePassModal from './ChangePassModal/ChangePassModal';
import AdminUserModal from './AuthUserModal/AuthUserModal';
import SuccessOperation from '../../../Core/SuccessOperation/SuccessOperation';
import styles from './AdminSecurity.module.css';

export default function AdminSecurity() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPassModal, setShowPassModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/auth/getUsers');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowPassModal(true);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/api/auth/deleteUser/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            console.log(`Deleted user with ID: ${userId}`);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleClosePassModal = (isSuccess) => {
        setShowPassModal(false);
        setSelectedUser(null);
        if (isSuccess) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    const handleAuthorizeUser = () => {
        setShowUserModal(true);
    };

    const handleCloseUserModal = (isSuccess) => {
        setShowUserModal(false);
        if (isSuccess) {
            getUsers();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    return (
        <div className={styles.container}>
            {showSuccess && <SuccessOperation/>}
            <h1 className={styles.mainHeading}>Admin Security</h1>
            <div className={styles.mainContainer}>
                <button onClick={handleAuthorizeUser} className='button__1'>Authorize a user</button>
                <ul className={styles.ul}>
                    {users.map(user => (
                        <li key={user._id}>
                            <p>{user.username}</p>
                            <div>
                                <button className='button__1' onClick={() => handleEdit(user)}>Edit</button>
                                <button className='button__1' onClick={() => handleDelete(user._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
            {showPassModal && selectedUser && (
                <ChangePassModal
                    user={selectedUser}
                    onClose={handleClosePassModal}
                />
            )}
            {showUserModal && (
                <AdminUserModal
                    onClose={handleCloseUserModal}
                    onSuccess={() => handleCloseUserModal(true)}
                />
            )}
        </div>
    );
}
