import styles from './AddOrder.module.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function AddOrder({tableNumber, onOrderPlaced}) {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/operations/getMenu');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const menu = await response.json();
                setMenu(menu);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMenu();
    }, [tableNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const orders = [];
        for (let [key, value] of formData.entries()) {
            if (value !== '0') {
                const [itemId, itemName, itemPrice] = key.split('|');
                orders.push({
                    name: itemName,
                    price: parseFloat(itemPrice),
                    quantity: parseInt(value, 10),
                });
            }
        }

        try {
            await axios.post('http://localhost:3001/api/operations/makeOrder', {
                tableNumber,
                orders,
            });
            onOrderPlaced();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.heading}>Menu</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {menu.map((menuItem) => (
                        <li key={menuItem._id} className={styles.menu__li}>
                            <label htmlFor={menuItem._id}>{menuItem.name} - ${menuItem.price}</label>
                            <input type='number' id={menuItem._id}
                                   name={`${menuItem._id}|${menuItem.name}|${menuItem.price}`} min='0'
                                   defaultValue='0'/>
                        </li>
                    ))}
                </ul>
                <button className='button__1' type="submit">Place order</button>
            </form>
        </div>
    );
}
