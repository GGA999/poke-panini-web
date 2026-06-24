import styles from './Stepper.module.css';

export default function ProgressBar({ value = 0, max = 100, label = 'Progress' }) {
  const numericMax = Number(max) > 0 ? Number(max) : 100;
  const numericValue = Math.min(Math.max(Number(value) || 0, 0), numericMax);
  const percent = Math.round((numericValue / numericMax) * 100);

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressMeta}>
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={numericMax}
        aria-valuenow={numericValue}
      >
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
