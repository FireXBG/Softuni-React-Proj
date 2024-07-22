import styles from './AdminView.module.css';

export default function AdminView() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin View</h1>
      <p className={styles.description}>
        This is an example of a protected route. You can only access this page if you are logged in.
      </p>
    </div>
  );
}