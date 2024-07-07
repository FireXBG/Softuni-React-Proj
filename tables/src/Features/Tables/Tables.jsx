import styles from './Tables.module.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tables() {
    const [tables, setTables] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/operations/getTables`);
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        }

        fetchTables();
    }, [])

    const takeTable = async (tableNumber) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/operations/takeTable`, { tableNumber });
            console.log(response.data)
            // Update the tables state

            const updatedTables = tables.map(table => {
                if (table.tableNumber === tableNumber) {
                    table.isTaken = true;
                }
                return table;
            })

            setTables(updatedTables);
        } catch (error) {
            console.error('Error taking table:', error);
        }
    }
    const selectTable = async (tableNumber) => {


        navigate(`/tables/${tableNumber}`)
    }

    return (
        <>
            <h1 className={styles.heading}>Select a table</h1>
            <div className={styles.tables__container}>
                {tables.map(table => (
                    <div key={table.tableNumber} className={styles.table}>
                        <p className={styles.table__number}>{table.tableNumber}</p>
                        <p>Is Taken: {table.isTaken ? 'Yes' : 'No'}</p>
                        {table.isTaken ? (
                            <button className={styles.button} onClick={() => selectTable(table.tableNumber)} >Select Table</button>
                        ) : (
                            <button className={styles.button} onClick={() => takeTable(table.tableNumber)} >Take Table</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}