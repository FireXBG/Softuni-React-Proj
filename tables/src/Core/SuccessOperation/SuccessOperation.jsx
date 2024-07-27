import styles from './SuccessOperation.module.css';

export default function SuccessOperation() {
    return (
        <div className={styles.overlay}>
            <div className={styles.successOperation}>
                <p>Operation Completed!</p>
            </div>
        </div>
    );
}
