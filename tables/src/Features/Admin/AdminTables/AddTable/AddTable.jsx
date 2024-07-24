import axios from "axios";
import { useState } from "react";
import styles from './AddTable.module.css';

export default function AddTable({ closeAddTableModal, fetchTables }) {
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tableNumber = formData.get('tableNumber');

        try {
            const response = await axios.post('http://localhost:3001/api/admin/addTable', { tableNumber });
            if (response.status === 200) {
                setResponseMessage(response.data.message);
                fetchTables();
                closeAddTableModal();
            } else {
                setResponseMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error adding table:', error);
            setResponseMessage('Error adding table: ' + (error.response?.data.message || error.message));
        }
    }

    return (
        <div className={styles.container}>
            <h1>Add Table</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Table Number:
                    <input type='text' name='tableNumber' required />
                </label>
                <button type='submit' className='button__1'>Add Table</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
