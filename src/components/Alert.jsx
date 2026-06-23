import styles from './Alert.module.css';

export default function Alert({
  variant = 'info',
  title,
  description,
  onClose,
  className = '',
}) {
  return (
    <div className={`${styles.alert} ${styles[variant]} ${className}`.trim()} role="alert">
      <div className={styles.text}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {onClose ? (
        <button className={styles.close} type="button" onClick={onClose} aria-label="Chiudi">
          ✕
        </button>
      ) : null}
    </div>
  );
}

