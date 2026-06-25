import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import Alert from '../../components/Alert';
import styles from './panino_pane.module.css'; // Puoi rinominarlo in panino.module.css se preferisci

// Import Icone Menu Laterale (Mantieni o adatta i percorsi se ne hai di nuovi)
import dimensioneIcon from '../../Assets/base.svg';
import paneIcon from '../../Assets/base.svg';
import farcituraIcon from '../../Assets/proteine.svg';
import salseIcon from '../../Assets/salse.svg';

// Import Immagini Pane
import bunClassicoImg from '../../Assets/bun.png';
import integraleImg from '../../Assets/integrale.png';
import cerealiImg from '../../Assets/cereali.png';
import focacciaImg from '../../Assets/focaccia.png';
import senzaGlutineImg from '../../Assets/glutine.png';

const BREAD_DATA = [
  {
    id: 'bun_classico',
    name: 'Bun Classico',
    desc: 'Morbido e fragrante.',
    price: 0,
    image: bunClassicoImg,
  },
  { id: 'integrale', name: 'Integrale', desc: 'Ricco di fibre.', price: 0, image: integraleImg },
  {
    id: 'ai_cereali',
    name: 'Ai Cereali',
    desc: 'Mix di semi tostati.',
    price: 0,
    image: cerealiImg,
  },
  {
    id: 'focaccia',
    name: 'Focaccia',
    desc: 'Tradizionale e saporita.',
    price: 0,
    image: focacciaImg,
  },
  {
    id: 'senza_glutine',
    name: 'Senza glutine',
    desc: 'Per celiaci.',
    price: 1.5,
    image: senzaGlutineImg,
    label: '+€1.50 • Per celiaci',
  },
];

export default function PaninoConfigurator() {
  const { type, initialize, selections, updateSelection, setPricing } = useConfigurator();
  const navigate = useNavigate();

  // Stati locali per la selezione attuale dello Step 1
  const [selectedSize, setSelectedSize] = useState(selections?.size || 'normale');
  const [selectedBread, setSelectedBread] = useState(selections?.bread || null);
  const [alert, setAlert] = useState(null);

  // Calcolo dinamico del prezzo
  const basePrice = selectedSize === 'maxi' ? 14.5 : 12.5; // Esempio: Maxi costa +2€ rispetto a 12.50€
  const breadExtra = BREAD_DATA.find((b) => b.id === selectedBread)?.price || 0;
  const totalPrice = basePrice + breadExtra;

  useEffect(() => {
    if (type !== 'panino') {
      initialize('panino');
    }
  }, [type, initialize]);

  useEffect(() => {
    updateSelection('size', selectedSize);
    updateSelection('bread', selectedBread);
    setPricing(totalPrice);
  }, [selectedSize, selectedBread, totalPrice, updateSelection, setPricing]);

  useEffect(() => {
    if (!alert) return;
    const timer = window.setTimeout(() => setAlert(null), 3000);
    return () => window.clearTimeout(timer);
  }, [alert]);

  const steps = [
    {
      id: 'dimensione_pane',
      label: 'Tipo di pane',
      icon: dimensioneIcon,
      completed: selectedBread !== null,
    },
    { id: 'farcitura', label: 'Farcitura', icon: farcituraIcon, completed: false },
    { id: 'salse', label: 'Salse', icon: salseIcon, completed: false },
  ];

  return (
    <div className={styles.pokePageContainer}>
      {alert && (
        <Alert
          variant={alert.variant}
          title={alert.title}
          description={alert.description}
          onClose={() => setAlert(null)}
          className={styles.alert}
        />
      )}

      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="dimensione_pane" items={steps} />

        <main className={styles.pokeMainContent}>
          <header className={styles.contentHeader}>
            <p className={styles.stepIndicator}>STEP 1 DI 4</p>
            <h1>Inizia il tuo Panino</h1>
            <p>Scegli la dimensione ideale e la tipologia di pane perfetta per la tua creazione.</p>
          </header>

          {/* 1. Seleziona Dimensione */}
          <section className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>1. Seleziona Dimensione</h2>
            <div className={styles.sizeGrid}>
              <button
                type="button"
                className={`${styles.sizeCard} ${selectedSize === 'normale' ? styles.selected : ''}`}
                onClick={() => setSelectedSize('normale')}
              >
                <div className={styles.sizeHeader}>
                  <span className={styles.sizeName}>Normale</span>
                  <span className={styles.sizePriceTag}>Incluso</span>
                </div>
                <p className={styles.sizeDesc}>
                  La scelta bilanciata, ideale per un pranzo fresco e veloce.
                </p>
              </button>

              <button
                type="button"
                className={`${styles.sizeCard} ${selectedSize === 'maxi' ? styles.selected : ''}`}
                onClick={() => setSelectedSize('maxi')}
              >
                <div className={styles.sizeHeader}>
                  <span className={styles.sizeName}>Maxi</span>
                  <span className={styles.sizePriceTag}>+€2.00</span>
                </div>
                <p className={styles.sizeDesc}>
                  Per i più affamati. 30% di ingredienti in più per la massima soddisfazione.
                </p>
              </button>
            </div>
          </section>

          {/* 2. Scegli il Pane */}
          <section className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>2. Scegli il Pane</h2>
            <div className={styles.sauceGrid}>
              {' '}
              {/* Riutilizza la griglia a 2 colonne */}
              {BREAD_DATA.map((bread) => {
                const isSelected = selectedBread === bread.id;

                return (
                  <button
                    key={bread.id}
                    type="button"
                    className={`${styles.sauceCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setSelectedBread(bread.id)}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={bread.image} alt={bread.name} />
                    </div>

                    <div className={styles.info}>
                      <div className={styles.header}>
                        <span>{bread.name}</span>
                        {bread.price > 0 && (
                          <span className={styles.price}>
                            {bread.label || `+€${bread.price.toFixed(2)}`}
                          </span>
                        )}
                      </div>
                      <p>{bread.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      <BottomActionBar
        left={
          <div className={styles.totalBox}>
            <span>Totale stimato</span>
            <strong>€{totalPrice.toFixed(2)}</strong>
          </div>
        }
        right={
          <>
            <div className={styles.selectionSummary}>
              <strong>
                {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
                {selectedBread ? ` + ${BREAD_DATA.find((b) => b.id === selectedBread)?.name}` : ''}
              </strong>
              <span>Selezionato</span>
            </div>

            <button
              className={styles.continueButton}
              type="button"
              onClick={() => {
                if (!selectedBread) {
                  setAlert({
                    variant: 'warning',
                    title: 'Seleziona il pane',
                    description: 'Devi scegliere un tipo di pane prima di continuare.',
                  });
                  return;
                }
                navigate('/panino_farcitura'); // Prossimo step fittizio
              }}
            >
              Continua →
            </button>
          </>
        }
      />
    </div>
  );
}
