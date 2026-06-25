import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import Alert from '../../components/Alert';
import styles from './panino_con.module.css';

// Asset icone sidebar
import baseIcon from '../../Assets/base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/condimenti.svg';
import salseIcon from '../../Assets/salse.svg';

// Immagini Formaggi
import cheddarImg from '../../Assets/cheddar.png';
import scamorzaImg from '../../Assets/scamorza.png';
import mozzarellaImg from '../../Assets/mozzarella.png';
import provolaImg from '../../Assets/provola.png';

// Immagini Verdure
import insalataImg from '../../Assets/insalata (2).png';
import pomodoroImg from '../../Assets/pomodoro.png';
import cipollaImg from '../../Assets/cipolla (2).png';
import cetrioliniImg from '../../Assets/cetrioli.png';
import melanzaneImg from '../../Assets/melanzane.png';
import zucchineImg from '../../Assets/zucchine.png';
import peperoniImg from '../../Assets/peperoni.png';

const CHEESES_DATA = [
  { id: 'cheddar', name: 'Cheddar', tag: 'GUSTOSO', image: cheddarImg },
  { id: 'scamorza', name: 'Scamorza', tag: 'AFFUMICATA', image: scamorzaImg },
  { id: 'mozzarella', name: 'Mozzarella', tag: 'FRESCA', image: mozzarellaImg },
  { id: 'provola', name: 'Provola', tag: 'DELICATA', image: provolaImg },
];

const VEGGIES_DATA = [
  { id: 'insalata', name: 'Insalata', image: insalataImg },
  { id: 'pomodoro', name: 'Pomodoro', image: pomodoroImg },
  { id: 'cipolla', name: 'Cipolla', image: cipollaImg },
  { id: 'cetriolini', name: 'Cetriolini', image: cetrioliniImg },
  { id: 'melanzane', name: 'Melanzane', image: melanzaneImg },
  { id: 'zucchine', name: 'Zucchine', image: zucchineImg },
  { id: 'peperoni', name: 'Peperoni', image: peperoniImg },
];

export default function PaninoCondimenti() {
  const { selections, updateSelection, getLimits, setPricing } = useConfigurator();
  const navigate = useNavigate();

  // Stati per la selezione multipla
  const [selectedCheeses, setSelectedCheeses] = useState(selections?.formaggi || []);
  const [selectedVeggies, setSelectedVeggies] = useState(selections?.verdure || []);
  const [alert, setAlert] = useState(null);

  // Limiti: max 1 formaggio, max 4 verdure (3 incluse, 4° costa +1.50€)
  const limits = { formaggi: 1, verdure: 4 };

  const basePrice = Number(selections?.basePrice) || 12.5;
  // Calcolo extra verdure: la 4° verdura costa +1.50€
  const veggieExtra = selectedVeggies.length > 3 ? 1.5 : 0;
  const totalPrice = basePrice + veggieExtra;

  useEffect(() => {
    updateSelection('formaggi', selectedCheeses);
    updateSelection('verdure', selectedVeggies);
    setPricing(totalPrice);
  }, [selectedCheeses, selectedVeggies, totalPrice]);

  useEffect(() => {
    if (!alert) return;
    const timer = window.setTimeout(() => setAlert(null), 3000);
    return () => window.clearTimeout(timer);
  }, [alert]);

  const toggleCheese = (id) => {
    if (selectedCheeses.includes(id)) {
      setSelectedCheeses(selectedCheeses.filter((c) => c !== id));
      return;
    }
    if (selectedCheeses.length < limits.formaggi) {
      setSelectedCheeses([...selectedCheeses, id]);
      return;
    }
    setAlert({
      variant: 'warning',
      title: 'Limite formaggi raggiunto',
      description: `Puoi selezionare al massimo ${limits.formaggi} formaggio.`,
    });
  };

  const toggleVeggie = (id) => {
    if (selectedVeggies.includes(id)) {
      setSelectedVeggies(selectedVeggies.filter((v) => v !== id));
      return;
    }
    if (selectedVeggies.length < limits.verdure) {
      setSelectedVeggies([...selectedVeggies, id]);
      return;
    }
    setAlert({
      variant: 'warning',
      title: 'Limite verdure raggiunto',
      description: `Puoi selezionare al massimo ${limits.verdure} verdure.`,
    });
  };

  const steps = [
    { id: 'base', label: 'Base', icon: baseIcon, completed: true },
    { id: 'proteine', label: 'Proteine', icon: proteineIcon, completed: true },
    { id: 'condimenti', label: 'Condimenti', icon: condimentiIcon, completed: false },
    { id: 'salse', label: 'Salse', icon: salseIcon, completed: false },
  ];

  return (
    <div className={styles.pageContainer}>
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
        <ConfiguratorSideMenu activeId="condimenti" items={steps} />

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <p className={styles.stepIndicator}>STEP 3 DI 4</p>
            <h1>Metti il gusto nel dettaglio</h1>
            <p>
              Scegli i tuoi formaggi preferiti e le verdure più fresche per il tuo panino gourmet.
            </p>
          </header>

          {/* Sezione Formaggi */}
          <section className={styles.section}>
            <div className={styles.sectionTitleWrapper}>
              <span className={styles.sectionIcon}>🧀</span>
              <h2>Formaggi</h2>
            </div>
            <div className={styles.condimentGrid}>
              {CHEESES_DATA.map((cheese) => {
                const isSelected = selectedCheeses.includes(cheese.id);
                return (
                  <button
                    key={cheese.id}
                    type="button"
                    className={`${styles.condimentCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => toggleCheese(cheese.id)}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={cheese.image} alt={cheese.name} />
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.condimentName}>{cheese.name}</span>
                      <span className={styles.condimentTag}>{cheese.tag}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sezione Verdure */}
          <section className={styles.section}>
            <div className={styles.sectionTitleWrapper}>
              <span className={styles.sectionIcon}>🗂️</span>
              <h2>Verdure</h2>
            </div>
            <div className={styles.condimentGrid}>
              {VEGGIES_DATA.map((veg) => {
                const isSelected = selectedVeggies.includes(veg.id);
                // Mostra +1.50€ se è la 4° verdura selezionata
                const showExtraPrice = isSelected && selectedVeggies.indexOf(veg.id) === 3;
                return (
                  <button
                    key={veg.id}
                    type="button"
                    className={`${styles.condimentCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => toggleVeggie(veg.id)}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={veg.image} alt={veg.name} />
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.condimentName}>
                        {veg.name}
                        {showExtraPrice && <span className={styles.extraPrice}> + 1,50 €</span>}
                      </span>
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
            <span>Totale Stimato</span>
            <strong>€{totalPrice.toFixed(2)}</strong>
          </div>
        }
        right={
          <>
            <div className={styles.summary}>
              <strong>
                {selections?.size || 'Regular'} + {selections?.base || 'Riso Venere'}
              </strong>
              <span>Selezionato</span>
            </div>
            <button
              className={styles.continueBtn}
              type="button"
              onClick={() => navigate('/panino_salse')}
            >
              Continua →
            </button>
          </>
        }
      />
    </div>
  );
}
