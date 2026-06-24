import styles from './Home.module.css';
import MixCard from '../components/MixCard';
import ProductCard from '../components/ProductCard';
import poke2Image from '../Assets/Poke2.svg';
import tartufoImage from '../Assets/tartufo.svg';
import poke3Image from '../Assets/poke3.svg';

const recommendedProducts = [
  {
    id: 1,
    title: 'Sunset Salmon Poke',
    price: '\u20ac12.50',
    description: 'Riso bianco, Salmone fresco, Avocado, Edamame, Alga Nori, Salsa Ponzu.',
    tags: ['BEST SELLER', 'HEALTHY'],
    image: poke2Image,
  },
  {
    id: 2,
    title: 'Tartufo Gourmet',
    price: '\u20ac9.00',
    description:
      'Ciabatta croccante, Roast Beef, Provolone dolce, Cipolle caramellate, Crema al Tartufo.',
    tags: ['PREMIUM'],
    image: tartufoImage,
  },
  {
    id: 3,
    title: 'Spicy Tuna Bowl',
    price: '\u20ac13.00',
    description: 'Quinoa, Tonno piccante, Jalapeno, Mango, Cipolla croccante, Mayo Sriracha.',
    tags: ['NEW ENTRY', 'SPICY'],
    image: poke3Image,
  },
];

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.heroHeader}>
        <h1>Crea il tuo mix perfetto.</h1>
        <p>
          Scegli tra la freschezza esotica delle nostre Poke o il calore avvolgente dei nostri
          Panini artigianali. Ingredienti premium, assemblati da te.
        </p>
      </header>

      <section className={styles.mixSection}>
        <MixCard
          title="Crea la tua Poke"
          description="Scegli base, proteine e condimenti per un'esplosione di freschezza hawaiana."
          buttonText="Inizia a comporre"
          variant="poke"
          to="/Poke"
          icon="P"
        />

        <MixCard
          title="Crea il tuo Panino"
          description="Pane artigianale e farciture gourmet per il massimo della soddisfazione."
          buttonText="Inizia a comporre"
          variant="panino"
          to="/panino"
          icon="B"
        />
      </section>

      <section>
        <div className={styles.recommendedHeader}>
          <div>
            <span className={styles.subtitle}>I NOSTRI PREFERITI</span>
            <h2>Consigliati</h2>
          </div>
        </div>

        <div className={styles.productGrid}>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
