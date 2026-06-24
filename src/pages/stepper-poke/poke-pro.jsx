import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomActionBar from '../../components/BottomActionBar';
import ConfiguratorOptionCard from '../../components/ConfiguratorOptionCard';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import { useConfigurator } from '../../context/ConfiguratorContext';
import styles from './poke-pro.module.css';
import baseIcon from '../../Assets/base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/condimenti.svg';
import salseIcon from '../../Assets/salse.svg';
import salmone from '../../Assets/salmone.png';
import gamberi from '../../Assets/gambiere.png';
import pollo from '../../Assets/pollo.png';
import tofu from '../../Assets/tofu.png';
import tonno from '../../Assets/tonno.png';
import uovo from '../../Assets/uovo.png';

const proteinOptions = [
  {
    id: 'salmone',
    name: 'Salmone',
    description: 'Fresco e marinato',
    price: 1.5,
    image: salmone,
  },
  {
    id: 'tonno',
    name: 'Tonno',
    description: 'Qualita sashimi',
    price: 2,
    image: tonno,
  },
  {
    id: 'pollo',
    name: 'Pollo',
    description: 'Grigliato al naturale',
    price: 0,
    image: pollo,
  },
  {
    id: 'gamberi',
    name: 'Gamberi',
    description: 'Al vapore, delicati',
    price: 1.8,
    image: gamberi,
  },
  {
    id: 'tofu',
    name: 'Tofu',
    description: 'Bio e proteico',
    price: 0,
    image: tofu,
  },
  {
    id: 'uovo',
    name: 'Uovo',
    description: 'Barzotto, km 0',
    price: 0,
    image: uovo,
  },
];

const steps = [
  { id: 'base', label: 'Base', icon: baseIcon, disabled: false },
  { id: 'proteine', label: 'Proteine', icon: proteineIcon, disabled: false },
  { id: 'condimenti', label: 'Condimenti', icon: condimentiIcon, disabled: true },
  { id: 'salse', label: 'Salse', icon: salseIcon, disabled: true },
];

export default function Poke2() {
  const { initialize, type, selections, updateSelection, getLimits, setPricing } =
    useConfigurator();
  const [selectedProteins, setSelectedProteins] = useState(selections?.proteins || []);

  const navigate = useNavigate();

  // IMPORTANT: il “basePrice” deve essere un prezzo di size (Small/Regular/Large) + base.
  // Se `pricing` arriva corrotto/asincrono (es. da localStorage), il totale esplode.
  // Qui lo forziamo a un numero valido e fallback solo se non è finito.
  // DOPO (legge il prezzo base dalle selections, non dal pricing aggiornato)
  const basePrice = Number(selections?.basePrice) || 12.5;
  const limits = getLimits(selections?.size);

  const proteinsTotal = selectedProteins.reduce((sum, id) => {
    const p = proteinOptions.find((o) => o.id === id);
    return sum + (p?.price || 0);
  }, 0);
  const currentPrice = basePrice + proteinsTotal;
  const sizeLabel = selections.size || 'Regular';
  const baseLabel = selections.base || 'Riso venere';

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, [type, initialize]);

  // DOPO
  useEffect(() => {
    updateSelection('proteins', selectedProteins);
    setPricing(currentPrice);
  }, [selectedProteins]);

  const handleSelectProtein = (id) => {
    setSelectedProteins((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      if (previous.length >= limits.proteine) return previous;

      return [...previous, id];
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="proteine" items={steps} />

        <main className={styles.main}>
          <header className={styles.contentHeader}>
            <p className={styles.stepIndicator}>Step 2 di 4</p>
            <h1>Scegli le tue proteine</h1>
            <p>
              Seleziona fino a 2 opzioni per la tua base. Ogni scelta aggiunge freschezza e gusto
              alla tua poke.
            </p>
          </header>

          <div className={styles.optionsGrid}>
            {proteinOptions.map((protein) => {
              const isSelected = selectedProteins.includes(protein.id);
              const isDisabled = !isSelected && selectedProteins.length >= limits.proteine;

              return (
                <ConfiguratorOptionCard
                  key={protein.id}
                  title={protein.name}
                  description={protein.description}
                  price={protein.price}
                  image={protein.image}
                  selected={isSelected}
                  disabled={isDisabled}
                  onClick={() => handleSelectProtein(protein.id)}
                />
              );
            })}
          </div>
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
                {sizeLabel} + {baseLabel}
              </strong>
              <span>
                {selectedProteins.length}/{limits.proteine} proteine selezionate
              </span>
            </div>
            <button
              className={styles.continueButton}
              type="button"
              onClick={() => navigate('/poke_con')}
            >
              Continua
            </button>
          </>
        }
      />
    </div>
  );
}
