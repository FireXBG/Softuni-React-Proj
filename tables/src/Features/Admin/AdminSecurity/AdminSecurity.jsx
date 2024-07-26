import styles from './AdminSecurity.module.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import ChangePassModal from './ChangePassModal/ChangePassModal';
import AdminUserModal from './AuthUserModal/AuthUserModal';

export default function AdminSecurity(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPassModal, setShowPassModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

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
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleClosePassModal = () => {
        setShowPassModal(false);
        setSelectedUser(null);
    };

    const handleAuthorizeUser = () => {
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Admin Security</h1>
            <div>
                <p>Users:</p>
                <button onClick={handleAuthorizeUser} className='button__1'>Authorize a user</button>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.username}
                            <button className='button__1' onClick={() => handleEdit(user)}>Edit</button>
                            <button className='button__1' onClick={() => handleDelete(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
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
                    onSuccess={getUsers}
                />
            )}
        </div>
    );
}