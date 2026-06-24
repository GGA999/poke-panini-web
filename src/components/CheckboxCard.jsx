import styles from './CheckboxCard.module.css';

export default function CheckboxCard({
  checked = false,
  disabled = false,
  onChange,
  title,
  description,
  className = '',
}) {
  return (
    <label
      className={`${styles.card} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} ${className}`.trim()}
    >
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-checked={checked}
      />
      <div className={styles.mark} aria-hidden="true">
        ✓
      </div>
      <div className={styles.content}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
    </label>
  );
}
