import styles from './Chip.module.css';

export default function Chip({
  selected = false,
  disabled = false,
  onClick,
  className = '',
  children,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

