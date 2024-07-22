import styles from './AdminView.module.css';
import AdminHeader from "../../../Core/AdminHeader/AdminHeader";

export default function AdminView() {
  return (
    <div className={styles.container}>
        <AdminHeader />
    </div>
  );
}