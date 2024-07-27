import styles from './AdminView.module.css';
import AdminHeader from "../../../Core/AdminHeader/AdminHeader";
import AdminTables from "../AdminTables/AdminTables";
import AdminMenu from "../AdminMenu/AdminMenu";
import AdminSecurity from "../AdminSecurity/AdminSecurity";
import AdminInfo from "../AdminInfo/AdminInfo";

export default function AdminView(props) {
    return (
        <div className={styles.container}>
            <AdminHeader/>
            {props.view === 'tables' && <AdminTables/>}
            {props.view === 'menu' && <AdminMenu/>}
            {props.view === 'security' && <AdminSecurity/>}
            {props.view === 'info' && <AdminInfo/>}
        </div>
    );
}