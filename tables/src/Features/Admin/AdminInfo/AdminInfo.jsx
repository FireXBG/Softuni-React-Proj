import styles from './AdminInfo.module.css';
import {useState, useEffect} from 'react';
import axios from "axios";

export default function AdminInfo() {
    const [info, setInfo] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        phoneNo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/info');
                const data = response.data || {};
                setInfo({
                    name: data.name || '',
                    addressLine1: data.addressLine1 || '',
                    addressLine2: data.addressLine2 || '',
                    phoneNo: data.phoneNo || ''
                });
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: info.name,
            address1: info.addressLine1,
            address2: info.addressLine2,
            phone: info.phoneNo
        };

        try {
            const response = await axios.post('http://localhost:3001/api/admin/updateInfo', data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Admin Info</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Restaurant name:
                    <input
                        type="text"
                        name="name"
                        value={info.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Restaurant address 1:
                    <input
                        type="text"
                        name="addressLine1"
                        value={info.addressLine1}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Restaurant address 2:
                    <input
                        type="text"
                        name="addressLine2"
                        value={info.addressLine2}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone number:
                    <input
                        type="text"
                        name="phoneNo"
                        value={info.phoneNo}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save changes</button>
            </form>
        </div>
    );
}