import { useNavigate } from 'react-router-dom';
import styles from './MixCard.module.css';

/* eslint-disable react/prop-types */
export default function MixCard({
  title,
  description,
  buttonText,
  variant = 'poke',
  icon,
  to,
}) {
  const navigate = useNavigate();
  const variantClass = variant === 'panino' ? styles.panino : styles.poke;

  return (
    <article className={`${styles.card} ${variantClass}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <span className={styles.icon}>{icon}</span>
          {title}
        </h3>

        <p className={styles.description}>{description}</p>

        <button
          className={styles.button}
          type="button"
          onClick={() => navigate(to)}
        >
          <span>{buttonText}</span>
        </button>
      </div>
    </article>
  );
}
