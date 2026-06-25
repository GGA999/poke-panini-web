import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import Alert from '../../components/Alert';
import styles from './panino_carne.module.css';

// Asset icone sidebar
import baseIcon from '../../Assets/base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/base.svg';
import salseIcon from '../../Assets/salse.svg';

// Immagini Prodotti (placeholder o reali)
import manzoImg from '../../Assets/manzo.png';
import polloImg from '../../Assets/pollo (2).png';
import cotolettaImg from '../../Assets/cotoletta.png';
import pulledImg from '../../Assets/pulled.png';
import vegetaleImg from '../../Assets/vegetale.png';

const PROTEIN_DATA = [
  {
    id: 'manzo',
    name: 'Hamburger di Manzo',
    desc: '100% Manzo italiano selezionato, grigliato al momento.',
    price: 0,
    tag: 'Standard',
    tagClass: 'tagStandard',
    image: manzoImg,
  },
  {
    id: 'pollo',
    name: 'Petto di Pollo',
    desc: 'Petto di pollo ruspante marinato alle erbe e grigliato.',
    price: 0.5,
    tag: 'Light',
    tagClass: 'tagLight',
    image: polloImg,
  },
  {
    id: 'cotoletta',
    name: 'Cotoletta',
    desc: 'Cotoletta di pollo impanata croccante artigianale.',
    price: 1,
    tag: 'Popolare',
    tagClass: 'tagPopolare',
    image: cotolettaImg,
  },
  {
    id: 'pulled',
    name: 'Pulled Pork',
    desc: 'Maiale sfilacciato cotto a bassa temperatura per 12 ore.',
    price: 2,
    tag: 'Gourmet',
    tagClass: 'tagGourmet',
    image: pulledImg,
  },
  {
    id: 'vegetale',
    name: 'Burger Vegetale',
    desc: 'Alternativa vegetale a base di soia e verdure di stagione.',
    price: 1.5,
    tag: 'Veg',
    tagClass: 'tagVeg',
    image: vegetaleImg,
  },
];

export default function PaninoProteine() {
  const { selections, updateSelection, setPricing } = useConfigurator();
  const navigate = useNavigate();

  const [selectedProtein, setSelectedProtein] = useState(selections?.proteina || null);
  const [alert, setAlert] = useState(null);

  // Calcolo prezzi (base + proteina selezionata)
  const basePrice = Number(selections?.basePrice) || 12.5;
  const proteinPrice = PROTEIN_DATA.find((p) => p.id === selectedProtein)?.price || 0;
  const totalPrice = basePrice + proteinPrice;

  useEffect(() => {
    updateSelection('proteina', selectedProtein);
    setPricing(totalPrice);
  }, [selectedProtein, totalPrice]);

  const steps = [
    { id: 'base', label: 'Base', icon: baseIcon, completed: true },
    { id: 'proteine', label: 'Proteine', icon: proteineIcon, completed: false },
    { id: 'condimenti', label: 'Condimenti', icon: condimentiIcon, completed: false },
    { id: 'salse', label: 'Salse', icon: salseIcon, completed: false },
  ];

  return (
    <div className={styles.pageContainer}>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="proteine" items={steps} />

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <p className={styles.stepIndicator}>STEP 2 DI 4</p>
            <h1>Scegli il tuo tipo di carne</h1>
            <p>
              L'anima del tuo panino. Seleziona una tra le nostre opzioni premium preparate al
              momento.
            </p>
          </header>

          <div className={styles.proteinGrid}>
            {PROTEIN_DATA.map((item) => {
              const isSelected = selectedProtein === item.id;
              return (
                <div
                  key={item.id}
                  className={`${styles.proteinCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedProtein(item.id)}
                >
                  {isSelected && (
                    <div className={styles.checkBadge}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  )}

                  <div className={styles.imageContainer}>
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className={styles.cardInfo}>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>

                    <div className={styles.cardFooter}>
                      <span className={`${styles.tag} ${styles[item.tagClass]}`}>{item.tag}</span>
                      <span className={styles.price}>
                        + €{item.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
              onClick={() =>
                selectedProtein
                  ? navigate('/panino_condimenti')
                  : setAlert({
                      variant: 'warning',
                      title: 'Attenzione',
                      description: 'Seleziona una proteina per continuare',
                    })
              }
            >
              Continua <i className="fa-solid fa-arrow-right"></i>
            </button>
          </>
        }
      />
    </div>
  );
}
