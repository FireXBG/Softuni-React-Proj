import styles from './AdminTables.module.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import AddTable from "./AddTable/AddTable";
import SuccessOperation from '../../../Core/SuccessOperation/SuccessOperation';

export default function AdminTables() {
    const [tables, setTables] = useState([]);
    const [showAddTableModal, setShowAddTableModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchTables = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/operations/getTables');
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const resetTable = async (tableNumber) => {
        try {
            const response = await fetch('http://localhost:3001/api/operations/closeTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tableNumber})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTables = tables.map(table => {
                if (table.tableNumber === tableNumber) {
                    table.isTaken = false;
                }
                return table;
            });

            setTables(updatedTables);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (error) {
            console.error('Error resetting table:', error);
        }
    }

    const deleteTable = async (tableNumber) => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/deleteTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tableNumber})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTables = tables.filter(table => table.tableNumber !== tableNumber);
            setTables(updatedTables);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    }

    const openAddTableModal = () => {
        setShowAddTableModal(true);
    }

    const closeAddTableModal = () => {
        setShowAddTableModal(false);
    }

    return (
        <div className={styles.container}>
            {showSuccess && <SuccessOperation/>}
            {showAddTableModal && (
                <>
                    <div className={styles.dimmingBackground} onClick={closeAddTableModal}></div>
                    <div className={styles.addTableContainer}>
                        <AddTable
                            closeAddTableModal={closeAddTableModal}
                            fetchTables={fetchTables}
                        />
                    </div>
                </>
            )}
            <h2 className={styles.mainHeading}>Manage Tables</h2>
            <button className='button__1' onClick={openAddTableModal}>Add Table</button>
            <div className={styles.tables__container}>
                {tables.map(table => (
                    <div key={table.tableNumber} className={styles.table}>
                        <p className={styles.table__number}>{table.tableNumber}</p>
                        <p>Is Taken: {table.isTaken ? 'Yes' : 'No'}</p>
                        <button className='button__1' onClick={() => resetTable(table.tableNumber)}>Reset Table</button>
                        <button className='button__1' onClick={() => deleteTable(table.tableNumber)}>Delete Table
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
