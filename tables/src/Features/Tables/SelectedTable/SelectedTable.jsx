import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SelectedTable.module.css';
import AddOrder from './AddOrder/AddOrder'; // Adjust the import path

export default function SelectedTable() {
    const { tableNumber } = useParams();
    const [table, setTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenAddOrder, setIsOpenAddOrder] = useState(false);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/operations/getTable/${tableNumber}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const table = await response.json();
                setTable(table);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [tableNumber]);

    const handleOrder = () => {
        setIsOpenAddOrder(!isOpenAddOrder);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!table) return <p>No data available for this table.</p>;

    return (
        <div className={styles.main}>
            <h1 className={styles.heading}>Table number: {table.tableNumber}</h1>
            <button className='button__1' onClick={handleOrder}>Make an order</button>
            {isOpenAddOrder && <AddOrder tableNumber={table.tableNumber} />}
            <div className={styles.orders__main}>
                <p className={styles.orders__p}>Orders:</p>
                <ul className={styles.orders__ul}>
                    {table.orders && table.orders.length > 0 ? table.orders.map((order, index) => {
                        return <li key={index} className={styles.orders__li}>{order}</li>;
                    }) : 'No orders yet'}
                </ul>
            </div>
        </div>
    );
}