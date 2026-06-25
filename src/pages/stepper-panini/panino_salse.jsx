import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import Alert from '../../components/Alert';
import styles from './panino_salse.module.css';

// Asset icone sidebar
import baseIcon from '../../Assets/base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/condimenti.svg';
import salseIcon from '../../Assets/salse.svg';

// Immagini Extra
import baconImg from '../../Assets/bacon.png';
import uovoImg from '../../Assets/uovo.png';
import cipollaCrocImg from '../../Assets/cipolla.png';
import doppiaCarneImg from '../../Assets/carne.png';

const EXTRAS_DATA = [
  { id: 'bacon', name: 'Bacon Croccante', price: 1.5, image: baconImg },
  { id: 'uovo', name: "Uovo all'Occhio", price: 1.2, image: uovoImg },
  { id: 'cipolla_croccante', name: 'Cipolla Croccante', price: 0.8, image: cipollaCrocImg },
  { id: 'doppia_carne', name: 'Doppia Carne', price: 3.5, image: doppiaCarneImg },
];

const SAUCES_DATA = [
  { id: 'maionese', name: 'Maionese', color: '#A04100' },
  { id: 'ketchup', name: 'Ketchup', color: '#BA1A1A' },
  { id: 'barbecue', name: 'Barbecue', color: '#572000' },
  { id: 'senape', name: 'Senape', color: '#FFD700' },
  { id: 'salsa_piccante', name: 'Salsa Piccante', color: '#BA1A1A', isSpicy: true },
];

export default function PaninoSalseExtra() {
  const { selections, updateSelection, setPricing } = useConfigurator();
  const navigate = useNavigate();

  // Stati per la selezione multipla
  const [selectedExtras, setSelectedExtras] = useState(selections?.extras || []);
  const [selectedSauces, setSelectedSauces] = useState(selections?.salse || []);
  const [alert, setAlert] = useState(null);

  // Calcolo dinamico del prezzo
  const proteinPrice =
    {
      manzo: 0,
      pollo: 0.5,
      cotoletta: 1,
      pulled: 2,
      vegetale: 1.5,
    }[selections?.proteina] || 0;
  const basePrice = Number(selections?.basePrice) || 0;
  const FREE_VEGGIES = 3;
  const EXTRA_VEGGIE_PRICE = 1.5;
  const veggieExtra = Math.max(0, (selections?.verdure?.length || 0) - FREE_VEGGIES) * EXTRA_VEGGIE_PRICE;
  const extrasPrice = EXTRAS_DATA.filter((e) => selectedExtras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0
  );
  const totalPrice = basePrice + proteinPrice + veggieExtra + extrasPrice;

  useEffect(() => {
    if (!alert) return;
    const timer = window.setTimeout(() => setAlert(null), 3000);
    return () => window.clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    updateSelection('extras', selectedExtras);
    updateSelection('salse', selectedSauces);
    setPricing(totalPrice);
  }, [selectedExtras, selectedSauces, totalPrice, updateSelection, setPricing]);

  const toggleExtra = (id) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const toggleSauce = (id) => {
    if (selectedSauces.includes(id)) {
      setSelectedSauces(selectedSauces.filter((s) => s !== id));
      return;
    }
    // Max 1 salsa
    if (selectedSauces.length >= 1) {
      setAlert({
        variant: 'warning',
        title: 'Limite salse raggiunto',
        description: 'Puoi selezionare al massimo 1 salsa.',
      });
      return;
    }
    setSelectedSauces([...selectedSauces, id]);
  };

  const steps = [
    { id: 'dimensione_pane', label: 'Tipo di pane', icon: baseIcon, completed: true },
    { id: 'proteine', label: 'Tipo di carne', icon: proteineIcon, completed: true },
    { id: 'condimenti', label: 'Formaggi & verdure', icon: condimentiIcon, completed: true },
    { id: 'salse', label: 'Salse', icon: salseIcon, completed: false },
  ];

  return (
    <div className={styles.pageContainer}>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="salse" items={steps} />

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <p className={styles.stepIndicator}>STEP 4 DI 4</p>
            <h1>Tocco Finale</h1>
            <p>Aggiungi quel qualcosa in più per rendere il tuo panino unico.</p>
          </header>

          {/* Sezione Extra */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.starIcon}>★</span> Gli Extra Golosi
            </div>

            <div className={styles.extrasGrid}>
              {EXTRAS_DATA.map((extra) => {
                const isAdded = selectedExtras.includes(extra.id);
                return (
                  <div key={extra.id} className={styles.extraCard}>
                    <div
                      className={`${styles.imageWrapper} ${extra.isIcon ? styles.fallbackIconBg : ''}`}
                    >
                      {extra.isIcon ? (
                        <span className={styles.customIcon}>🍳</span> // Fallback se manca un'immagine
                      ) : (
                        <img src={extra.image} alt={extra.name} />
                      )}
                    </div>

                    <div className={styles.extraDetails}>
                      <h3>{extra.name}</h3>
                      <p className={styles.extraPrice}>+ €{extra.price.toFixed(2)}</p>
                      <button
                        type="button"
                        className={`${styles.addBtn} ${isAdded ? styles.added : ''}`}
                        onClick={() => toggleExtra(extra.id)}
                      >
                        {isAdded ? 'Rimuovi' : 'Aggiungi'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sezione Salse */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.sauceIcon}>🍹</span> Scegli le Salse
            </div>

            <div className={styles.saucesContainer}>
              {SAUCES_DATA.map((sauce) => {
                const isSelected = selectedSauces.includes(sauce.id);
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    className={`${styles.saucePill} ${isSelected ? styles.sauceSelected : ''}`}
                    onClick={() => toggleSauce(sauce.id)}
                  >
                    <span className={styles.colorDot} style={{ backgroundColor: sauce.color }}>
                      {sauce.isSpicy && <span className={styles.fireEmoji}>🔥</span>}
                    </span>
                    {sauce.name}
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
            <span>Totale Stimato</span>
            <strong className={styles.greenPrice}>€{totalPrice.toFixed(2)}</strong>
          </div>
        }
        right={
          <>
            <div className={styles.summary}>
              <strong>
                {selections?.size || 'Normale'} + {selections?.bread || 'Bun Classico'}
              </strong>
              <span>Selezionato</span>
            </div>
            <button className={styles.submitBtn} type="button" onClick={() => navigate('/panino_fine')}>
              Vai al Riepilogo
            </button>
          </>
        }
      />
    </div>
  );
}
