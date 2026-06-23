import styles from './RadioCard.module.css';

export default function RadioCard({
  selected = false,
  disabled = false,
  onChange,
  name,
  title,
  description,
  className = '',
}) {
  return (
    <label
      className={`${styles.card} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''} ${className}`.trim()}
    >
      <input
        className={styles.input}
        type="radio"
        checked={selected}
        disabled={disabled}
        name={name}
        onChange={() => onChange?.()}
        aria-checked={selected}
      />
      <div className={styles.dot} aria-hidden="true" />
      <div className={styles.content}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
    </label>
  );
}

