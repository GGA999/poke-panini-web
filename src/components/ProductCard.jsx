import styles from './ProductCard.module.css';

/* eslint-disable react/prop-types */
export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h4 className={styles.title}>{product.title}</h4>
          <span className={styles.price}>{product.price}</span>
        </div>

        <p className={styles.ingredients}>{product.description}</p>

        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <button className={styles.button} type="button">
          Aggiungi al carrello
        </button>
      </div>
    </article>
  );
}
