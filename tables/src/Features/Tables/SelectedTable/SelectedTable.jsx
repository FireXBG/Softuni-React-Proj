import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SelectedTable.module.css';
import AddOrder from './AddOrder/AddOrder';
import CloseTable from './CloseTable/CloseTable';

export default function SelectedTable() {
    const { tableNumber } = useParams();
    const navigate = useNavigate();
    const [table, setTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenAddOrder, setIsOpenAddOrder] = useState(false);
    const [isTableClosed, setIsTableClosed] = useState(false);

    const fetchTable = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/operations/getTable/${tableNumber}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const tableData = await response.json();
            setTable(tableData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [tableNumber]);

    useEffect(() => {
        fetchTable();
        console.log('SelectedTable component mounted or updated');
    }, [fetchTable]);

    const handleOrder = () => {
        setIsOpenAddOrder(!isOpenAddOrder);
    };

    const handleOrderPlaced = () => {
        fetchTable();
        setIsOpenAddOrder(false);
    };

    const handleCloseTable = () => {
        if (isTableClosed) {
            console.log('Table already closed');
            return;
        }
        console.log('Closing table');
        setIsTableClosed(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!table) return <p>No data available for this table.</p>;

    return (
        <div className={styles.main}>
            {isTableClosed ? (
                <CloseTable key={table.tableNumber} table={table} />
            ) : (
                <>
                    <h1 className={styles.heading}>Table number: {table.tableNumber}</h1>
                    <button className='button__1' onClick={handleOrder}>Make an order</button>
                    {isOpenAddOrder && <AddOrder tableNumber={table.tableNumber} onOrderPlaced={handleOrderPlaced} />}
                    <div className={styles.orders__main}>
                        <p className={styles.orders__p}>Orders:</p>
                        <ul className={styles.orders__ul}>
                            {table.orders && table.orders.length > 0 ? table.orders.map((order, index) => (
                                <li key={index} className={styles.orders__li}>
                                    {order.name} - ${order.price} x {order.quantity} = ${(order.price * order.quantity).toFixed(2)}
                                </li>
                            )) : 'No orders yet'}
                        </ul>
                        <button className='button__1' onClick={handleCloseTable}>Finish table</button>
                    </div>
                    <button className='button__1' onClick={() => navigate('/tables')}>Back</button>
                </>
            )}
        </div>
    );
}
