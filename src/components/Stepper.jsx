import styles from './Stepper.module.css';

export default function Stepper({ steps = [], currentStep = 0 }) {
  return (
    <div className={styles.stepper} role="list" aria-label="Progress">
      {steps.map((label, idx) => {
        const state = idx < currentStep ? 'done' : idx === currentStep ? 'current' : 'upcoming';
        return (
          <div key={label ?? idx} className={styles.step} role="listitem">
            <div className={`${styles.bullet} ${styles[state]}`}>
              {state === 'done' ? '✓' : idx + 1}
            </div>
            <div className={styles.label}>{label}</div>
            {idx < steps.length - 1 ? (
              <div className={`${styles.line} ${state === 'done' ? styles.doneLine : ''}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
