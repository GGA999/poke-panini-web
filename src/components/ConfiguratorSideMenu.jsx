import styles from './ConfiguratorSideMenu.module.css';

import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../context/ConfiguratorContext';

export default function ConfiguratorSideMenu({
  title = 'Il Tuo Mix',
  subtitle = 'Personalizza il tuo ordine',
  items = [],
  activeId,
}) {
  const navigate = useNavigate();
  const { type } = useConfigurator();

  const resolvePathForItem = (item) => {
    if (item.path) return item.path;

    const isPanino = type === 'panino';

    const map = isPanino
      ? {
          dimensione_pane: '/panino_pane',
          base: '/panino_pane',
          proteine: '/panino_carne',
          farcitura: '/panino_condimenti',
          condimenti: '/panino_condimenti',
          salse: '/panino_salse',
        }
      : {
          base: '/poke',
          proteine: '/poke2',
          condimenti: '/poke_con',
          salse: '/poke_salse',
        };

    return map[item.id];
  };

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
                  onClick={() => {
                    if (item.disabled) return;
                    const path = resolvePathForItem(item);
                    if (path) navigate(path);
                  }}
                >
                  <span className={styles.icon}>
                    <img src={item.icon} alt="" aria-hidden="true" />
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
