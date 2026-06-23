import styles from './BottomActionBar.module.css';

export default function BottomActionBar({ left, right, children, className = '' }) {
  return (
    <footer className={`${styles.bar} ${className}`.trim()}>
      {children || (
        <div className={styles.content}>
          <div>{left}</div>
          <div className={styles.actions}>{right}</div>
        </div>
      )}
    </footer>
  );
}

