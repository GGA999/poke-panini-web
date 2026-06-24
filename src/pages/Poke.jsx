import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../context/ConfiguratorContext';
import BottomActionBar from '../components/BottomActionBar';
import ConfiguratorSideMenu from '../components/ConfiguratorSideMenu';
import styles from './poke.module.css';
import baseIcon from '../Assets/base.svg';
import proteineIcon from '../Assets/proteine.svg';
import condimentiIcon from '../Assets/condimenti.svg';
import salseIcon from '../Assets/salse.svg';
import cartIcon from '../Assets/cart.svg';
import cartSel from '../Assets/cart_sele.svg';
import insalata from '../Assets/insalata.png';
import quinoa from '../Assets/quinoa.png';
import riso_bianco from '../Assets/riso_bianco.png';
import riso_venere from '../Assets/riso_venere.png';

const sizes = [
  {
    id: 'Small',
    label: 'Small',
    price: 9.5,
    description: '1 proteina, 2 condimenti, 1 salsa',
  },
  {
    id: 'Regular',
    label: 'Regular',
    price: 12.5,
    description: '2 proteine, 4 condimenti, 2 salse',
    badge: 'Più scelto',
  },
  {
    id: 'Large',
    label: 'Large',
    price: 15.5,
    description: '3 proteine, 6 condimenti, 3 salse',
  },
];

const bases = [
  {
    id: 'Riso bianco',
    label: 'Riso bianco',
    image: riso_bianco,
  },
  {
    id: 'Riso venere',
    label: 'Riso venere',
    image: riso_venere,
  },
  {
    id: 'Quinoa',
    label: 'Quinoa',
    image: quinoa,
  },
  {
    id: 'Insalata',
    label: 'Insalata',
    image: insalata,
  },
];

export default function Poke() {
  const { initialize, type, updateSelection, setPricing } = useConfigurator();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedBase, setSelectedBase] = useState('Riso venere');
  const hasProteine = false;
  const hasCondimenti = false;
  const hasSalse = false;

  const steps = [
    { id: 'base', label: 'Base', icon: baseIcon, disabled: false },
    { id: 'proteine', label: 'Proteine', icon: proteineIcon, disabled: !hasProteine },
    { id: 'condimenti', label: 'Condimenti', icon: condimentiIcon, disabled: !hasCondimenti },
    { id: 'salse', label: 'Salse', icon: salseIcon, disabled: !hasSalse },
  ];

  const currentPrice = sizes.find((size) => size.id === selectedSize)?.price ?? 0;

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, [type, initialize]);

  useEffect(() => {
    updateSelection('size', selectedSize);
    updateSelection('base', selectedBase);
    setPricing(currentPrice);
  }, [currentPrice, selectedBase, selectedSize, setPricing, updateSelection]);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="base" items={steps} />

        <main className={styles.main}>
          <p className={styles.stepIndicator}>Step 1 di 4</p>
          <h1 className={styles.title}>Scegli la dimensione e la base</h1>
          <p className={styles.subtitle}>
            Crea la tua poke perfetta partendo dalle fondamenta. Scegli quanto hai fame e il tuo
            cereale o insalata preferita.
          </p>

          {/* SEZIONE 1: SIZE */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.stepNumber}>1</span>
              <h2>Quanto vuoi che sia grande?</h2>
            </div>

            <div className={styles.sizeGrid}>
              {sizes.map((size) => {
                const isSelected = selectedSize === size.id;
                return (
                  <button
                    key={size.id}
                    className={`${styles.sizeCard} ${isSelected ? styles.selected : ''}`}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    aria-pressed={isSelected}
                  >
                    {size.badge && <span className={styles.badge}>{size.badge}</span>}

                    {/* Contenitore Flexbox con Icona a sinistra e Prezzo a destra */}
                    <span className={styles.cardHeader}>
                      <span className={styles.cardIcon}>
                        <img src={isSelected ? cartSel : cartIcon} alt="" aria-hidden="true" />
                      </span>
                      <span className={styles.price}>€{size.price.toFixed(2)}</span>
                    </span>

                    <strong className={styles.dimensione}>{size.label}</strong>
                    <span className={styles.cardDescription}>{size.description}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SEZIONE 2: BASES */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.stepNumber}>2</span>
              <h2>Scegli la tua base</h2>
            </div>

            <div className={styles.baseGrid}>
              {bases.map((base) => {
                const isSelected = selectedBase === base.id;
                return (
                  <button
                    key={base.id}
                    className={`${styles.baseCard} ${isSelected ? styles.selected : ''}`}
                    type="button"
                    onClick={() => setSelectedBase(base.id)}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.imageContainer}>
                      <img src={base.image} alt={base.label} />
                    </span>
                    <span>{base.label}</span>
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
            <strong>€{currentPrice.toFixed(2)}</strong>
          </div>
        }
        right={
          <>
            <div className={styles.selectionSummary}>
              <strong>
                {selectedSize} + {selectedBase}
              </strong>
              <span>Selezionato</span>
            </div>
            <button
              className={styles.continueButton}
              type="button"
              onClick={() => navigate('/poke2')}
            >
              Continua
            </button>
          </>
        }
      />
    </div>
  );
}
