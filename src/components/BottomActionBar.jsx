import styles from './BottomActionBar.module.css';

export default function BottomActionBar({ children }) {
  return <div className={styles.bar}>{children}</div>;
}

