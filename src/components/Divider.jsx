import styles from './Divider.module.css';

export default function Divider({ className = '', orientation = 'horizontal' }) {
  return (
    <div
      className={`${styles.divider} ${styles[orientation]} ${className}`.trim()}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
