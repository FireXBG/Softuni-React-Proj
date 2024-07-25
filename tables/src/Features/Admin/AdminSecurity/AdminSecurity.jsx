import styles from './AdminSecurity.module.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import ChangePassModal from './ChangePassModal/ChangePassModal';

export default function AdminSecurity(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/auth/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
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

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Admin Security</h1>
            <div>
                <p>Users:</p>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.username}
                            <button className={styles.button} onClick={() => handleEdit(user)}>Edit</button>
                            <button className={styles.button} onClick={() => handleDelete(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && selectedUser && (
                <ChangePassModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
