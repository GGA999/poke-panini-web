import styles from './ConfiguratorSideMenu.module.css';

export default function ConfiguratorSideMenu({
  title = 'Il Tuo Mix',
  subtitle = 'Personalizza il tuo ordine',
  items = [],
  activeId,
}) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <nav aria-label={title}>
        <ul className={styles.list}>
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
              <button
                className={`${styles.item} ${
                  isActive ? styles.active : ''
                } ${item.disabled ? styles.disabled : ''}`}
                type="button"
                disabled={item.disabled}
                aria-current={isActive ? 'step' : undefined}
              >
              <span className={styles.icon}>
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                />
              </span>
                <span>{item.label}</span>
              </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
