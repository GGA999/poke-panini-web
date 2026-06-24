import styles from './EmptyState.module.css';

export default function EmptyState({ title = 'Nessun contenuto', description, action }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon} aria-hidden="true">
        📭
      </div>
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
