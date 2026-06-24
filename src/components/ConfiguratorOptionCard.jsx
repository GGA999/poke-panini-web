import styles from './ConfiguratorOptionCard.module.css';

export default function ConfiguratorOptionCard({
  title,
  description,
  price,
  image,
  selected = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className={styles.imageContainer}>
        <img src={image} alt={title} />
      </span>
      <span className={styles.info}>
        <span className={styles.textGroup}>
          <strong>{title}</strong>
          <span>{description}</span>
        </span>
        <span className={`${styles.priceTag} ${price === 0 ? styles.gr : styles.re}`}>
          {price === 0 ? 'Incluso' : `+€${price.toFixed(2)}`}
        </span>
      </span>
    </button>
  );
}
