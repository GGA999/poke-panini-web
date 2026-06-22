import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const recommendedProducts = [
  {
    id: 1,
    title: 'Sunset Salmon Poke',
    price: '€12.50',
    description:
      'Riso bianco, Salmone fresco, Avocado, Edamame, Alga Nori, Salsa Ponzu.',
    tags: ['BEST SELLER', 'HEALTHY'],
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 2,
    title: 'Tartufo Gourmet',
    price: '€9.00',
    description:
      'Ciabatta croccante, Roast Beef, Provolone dolce, Cipolle caramellate, Crema al Tartufo.',
    tags: ['PREMIUM'],
    image:
      'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 3,
    title: 'Spicy Tuna Bowl',
    price: '€13.00',
    description:
      'Quinoa, Tonno piccante, Jalapeño, Mango, Cipolla croccante, Mayo Sriracha.',
    tags: ['NEW ENTRY', 'SPICY'],
    image:
      'https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

// MIX CARD
const MixCard = ({
  title,
  description,
  btnText,
  bgClass,
  btnClass,
  icon,
  to,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles['mix-card']} ${styles[bgClass]}`}>
      <div className={styles['mix-card-content']}>
        <h3 className={styles['mix-title']}>
          <span className={styles['mix-icon']}>{icon}</span> {title}
        </h3>

        <p className={styles['mix-description']}>{description}</p>

        <button
          className={`${styles.btn} ${styles[btnClass]}`}
          onClick={() => navigate(to)}
        >
          <span>{btnText}</span>
        </button>
      </div>
    </div>
  );
};

// PRODUCT CARD
const ProductCard = ({ product }) => (
  <div className={styles['product-card']}>
    <div className={styles['product-image-container']}>
      <img
        src={product.image}
        alt={product.title}
        className={styles['product-image']}
      />
    </div>

    <div className={styles['product-info']}>
      <div className={styles['product-header']}>
        <h4 className={styles['product-title']}>{product.title}</h4>
        <span className={styles['product-price']}>{product.price}</span>
      </div>

      <p className={styles['product-ingredients']}>
        {product.description}
      </p>

      <div className={styles['product-tags']}>
        {product.tags.map((tag) => (
          <span key={tag} className={styles['tag']}>
            {tag}
          </span>
        ))}
      </div>

      <button className={styles['btn-outline']}>
        Aggiungi al carrello
      </button>
    </div>
  </div>
);

// APP
export default function App() {
  return (
    <div className={styles['app-container']}>

      <header className={styles['hero-header']}>
        <h1>Crea il tuo mix perfetto.</h1>
        <p>
          Scegli tra la freschezza esotica delle nostre Poke o il calore
          avvolgente dei nostri Panini artigianali.
        </p>
      </header>

      <section className={styles['mix-section']}>
        <MixCard
          title="Crea la tua Poke"
          description="Scegli base, proteine e condimenti per un'esplosione di freschezza hawaiana."
          btnText="Inizia a comporre"
          bgClass="bg-poke"
          btnClass="btn-orange"
          //riga che apre Carrello.jsx se premuto
          to="/Poke"
          icon="🥣"
        />

        <MixCard
          title="Crea il tuo Panino"
          description="Pane artigianale e farciture gourmet per il massimo della
          soddisfazione."
          btnText="Inizia a comporre"
          bgClass="bg-panino"
          btnClass="btn-green"
          to="/panino"
          icon="🥪"
        />
      </section>

      <section className={styles['recommended-section']}>

        <div className={styles['recommended-header']}>
          <div>
            <span className={styles['subtitle']}>I NOSTRI PREFERITI</span>
            <h2>Consigliati dal brand</h2>
          </div>

          <a href="#" className={styles['view-all-link']}>
            Vedi tutto →
          </a>
        </div>

        <div className={styles['product-grid']}>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>
    </div>
  );
} 