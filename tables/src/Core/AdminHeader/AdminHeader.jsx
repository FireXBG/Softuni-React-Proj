import styles from './AdminHeader.module.css';
import {Link} from "react-router-dom";

export default function AdminHeader() {
    return (
        <header>
            <h1 className={styles.title}>Admin Panel</h1>
            <ul className={styles.ul}>
                <li><Link to='/admin/tables' className='button__1'>Tables</Link></li>
                <li><Link to='/admin/menus' className='button__1'>Menu</Link></li>
                <li><Link to='/admin/security' className='button__1'>Security</Link></li>
                <li><Link to='/admin/info' className='button__1'>Info</Link></li>
                <li><Link to='/tables' className='button__1'>Exit</Link></li>
            </ul>
        </header>
    )
}