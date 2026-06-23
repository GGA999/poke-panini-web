import styles from './PriceSummary.module.css';

export default function PriceSummary({ total, currency = '€', lines = [] }) {
  return (
    <div className={styles.wrap} aria-label="Price summary">
      {lines.length > 0 ? (
        <div className={styles.lines}>
          {lines.map((l) => (
            <div key={l.label} className={styles.line}>
              <span className={styles.label}>{l.label}</span>
              <span className={styles.value}>
                {currency}
                {Number(l.amount ?? 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className={styles.total}>
        <span className={styles.totalLabel}>Totale</span>
        <span className={styles.totalValue}>
          {currency}
          {Number(total ?? 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

