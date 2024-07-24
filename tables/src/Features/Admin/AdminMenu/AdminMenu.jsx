import styles from './AdminMenu.module.css';
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminMenu() {
    const [menu, setMenu] = useState([]);
    const [newMenu, setNewMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/operations/getMenu');
                if(response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const menu = response.data;
                setMenu(menu);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchMenu();
    }, []);

    const handleChanges = async (e) => {
        const [itemId, itemName, itemPrice] = e.target.name.split('|');
        const newPrice = parseFloat(e.target.value);
        const newMenuItem = {
            _id: itemId,
            name: itemName,
            price: newPrice,
        };

        const newMenu = menu.map((menuItem) => {
            if(menuItem._id === itemId) {
                return newMenuItem;
            }

            return menuItem;
        });

        setMenu(newMenu);
    }

    return (
        <div className={styles.container}>
            <h1>Manage Menu</h1>
            <ul>
                {menu.map((menuItem) => (
                    <li key={menuItem._id} className={styles.menu__li}>
                        <label htmlFor={menuItem._id}>{menuItem.name} - {menuItem.price} $</label>
                        <input onChange={handleChanges} type='number' id={menuItem._id} name={`${menuItem._id}|${menuItem.name}|${menuItem.price}`} min='0' defaultValue='0' value={menuItem.price} />
                    </li>
                ))}
            </ul>
        </div>
    );
}