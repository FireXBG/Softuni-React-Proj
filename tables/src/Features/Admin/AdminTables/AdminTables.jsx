import styles from './AdminTables.module.css';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function AdminTables() {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/operations/getTables');
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    const resetTable = async (tableNumber) => {
        try {
            const response = await fetch('http://localhost:3001/api/operations/closeTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tableNumber })
            })

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTables = tables.map(table => {
                if (table.tableNumber === tableNumber) {
                    table.isTaken = false;
                }
                return table;
            });

            setTables(updatedTables);
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
                body: JSON.stringify({ tableNumber })
            })

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTables = tables.filter(table => table.tableNumber !== tableNumber);
            setTables(updatedTables);
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    }

    const openAddTableModal = async () => {}

    return (
        <div className={styles.container}>
            <h2 className={styles.mainHeading}>Manage Tables</h2>
            <button className='button__1'>Add Table</button>
            <div className={styles.tables__container}>
                {tables.map(table => (
                    <div key={table.tableNumber} className={styles.table}>
                        <p className={styles.table__number}>{table.tableNumber}</p>
                        <p>Is Taken: {table.isTaken ? 'Yes' : 'No'}</p>
                        <button className='button__1' onClick={() => {resetTable(table.tableNumber)}}>Reset Table</button>
                        <button className='button__1' onClick={() => {deleteTable(table.tableNumber)}}>Delete Table</button>
                    </div>
                ))}
            </div>
        </div>
    );
}