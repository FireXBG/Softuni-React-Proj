import {useState} from 'react';
import styles from './AddItemModal.module.css';

const AddItemModal = ({isOpen, onClose, onAddItem}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            name,
            price: parseFloat(price)
        };
        await onAddItem(newItem);
        onClose();
    };

    return (
        isOpen ? (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Add New Item</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Item Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                        </label>
                        <label>
                            Price:
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required
                                   min="0" step="0.01"/>
                        </label>
                        <div className={styles.modalActions}>
                            <button type="submit" className='button__1'>Add Item</button>
                            <button type="button" className='button__1' onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default AddItemModal;