import styles from './AdminMenu.module.css';
import {useState, useEffect} from "react";
import axios from "axios";
import AddItemModal from './AddItemModal/AddItemModal';

export default function AdminMenu() {
    const [menu, setMenu] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/operations/getMenu');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const menuData = response.data;
                setMenu(menuData);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchMenu();
    }, []);

    const handleChanges = (e) => {
        const [itemId, itemName] = e.target.name.split('|');
        const newPrice = parseFloat(e.target.value);
        const newMenuItem = {
            _id: itemId,
            name: itemName,
            price: newPrice,
        };

        const updatedMenu = menu.map((menuItem) => {
            if (menuItem._id === itemId) {
                return newMenuItem;
            }

            return menuItem;
        });

        setMenu(updatedMenu);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/admin/updateMenu', {
                menu: menu,
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            console.log('Changes saved successfully');
            const updatedMenu = response.data;
            setMenu(updatedMenu);
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
    }

    const handleAddItem = async (newItem) => {
        const response = await axios.post('http://localhost:3001/api/admin/addMenuItem', newItem);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        const addedItem = response.data;
        setMenu([...menu, addedItem]);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Manage Menu</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {menu.map((menuItem) => (
                        <li key={menuItem._id} className={styles.menu__li}>
                            <label htmlFor={menuItem._id}>{menuItem.name}:</label>
                            <input onChange={handleChanges} type='number' id={menuItem._id}
                                   name={`${menuItem._id}|${menuItem.name}|${menuItem.price}`} min='0'
                                   value={menuItem.price}/>
                        </li>
                    ))}
                </ul>
                <div className={styles.action__buttons}>
                    <button type='submit' className='button__1'>Save changes</button>
                    <button type='button' className='button__1' onClick={() => setIsModalOpen(true)}>Add an item
                    </button>
                </div>
            </form>
            {isModalOpen &&
                <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem}/>}
        </div>
    );
}