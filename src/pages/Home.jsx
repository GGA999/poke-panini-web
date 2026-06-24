import { useQuery } from '@tanstack/react-query';
import styles from './Home.module.css';
import MixCard from '../components/MixCard';
import ProductCard from '../components/ProductCard';
import tartufoImage from '../Assets/tartufo.svg';
import paneImage from '../Assets/Pane.jpg';
import paneIcon from '../Assets/pane.svg';
import { getRecommendedSandwiches } from '../api/brandRecipes';

const fallbackImages = [tartufoImage, paneImage, paneIcon];

function formatPrice(cents, currency = 'EUR') {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

function recipeToProduct(recipe, index) {
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const ingredientSummary = ingredients
    .map((ingredient) => ingredient.name)
    .filter(Boolean)
    .join(', ');
  const totalCents = recipe.price?.totalCents ?? recipe.defaultSize?.basePriceCents ?? 0;
  const currency = recipe.price?.currency ?? recipe.defaultSize?.currency ?? 'EUR';

  return {
    id: recipe.id,
    title: recipe.name,
    price: formatPrice(totalCents, currency),
    description: recipe.description || ingredientSummary || 'Panino artigianale consigliato.',
    tags: ['PANINO', recipe.isCustomizable ? 'CUSTOM' : 'CHEF'],
    image: recipe.imageUrl || fallbackImages[index % fallbackImages.length],
  };
}

export default function Home() {
  const {
    data: recommendedSandwiches = [],
    error,
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['recommended-sandwiches'],
    queryFn: ({ signal }) => getRecommendedSandwiches({ signal }),
    retry: 1,
  });
  const recommendedProducts = recommendedSandwiches.map(recipeToProduct);

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
            <h2>Panini consigliati</h2>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.statusMessage} aria-live="polite">
            Caricamento panini consigliati...
          </div>
        ) : null}

        {isError ? (
          <div className={styles.statusMessage} role="alert">
            {error?.message || 'Impossibile caricare i panini consigliati.'}
          </div>
        ) : null}

        {!isLoading && !isError && recommendedProducts.length === 0 ? (
          <div className={styles.statusMessage} aria-live="polite">
            Nessun panino consigliato disponibile.
          </div>
        ) : null}

        {!isLoading && !isError && recommendedProducts.length > 0 ? (
          <div className={styles.productGrid} aria-busy={isFetching}>
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
