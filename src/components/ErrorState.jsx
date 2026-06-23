import styles from './ErrorState.module.css';

export default function ErrorState({
  title = 'Si è verificato un errore',
  description = 'Riprova più tardi o aggiorna la pagina.',
  action,
}) {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.icon} aria-hidden="true">⚠️</div>
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

