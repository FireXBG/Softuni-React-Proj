import styles from './AdminView.module.css';
import AdminHeader from "../../../Core/AdminHeader/AdminHeader";

export default function AdminView(props) {
  return (
    <div className={styles.container}>
        <AdminHeader />
        {props.view === 'tables' && <h2>Tables</h2>}
        {props.view === 'menu' && <h2>Menu</h2>}
        {props.view === 'security' && <h2>Security</h2>}
    </div>
  );
}