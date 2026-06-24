import styles from './Card.module.css';

export default function Card({ variant = 'default', className = '', children }) {
  return <div className={`${styles.card} ${styles[variant]} ${className}`.trim()}>{children}</div>;
}
