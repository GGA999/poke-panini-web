import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import styles from './poke_salse.module.css';

import baseIcon from '../../Assets/Base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/condimenti.svg';
import salseIcon from '../../Assets/salse.svg';

import soiaImg from '../../Assets/salsa_soia.png';
import teriyakiImg from '../../Assets/teriyaki.png';
import spicyImg from '../../Assets/spicy_maio.png';
import ponzuImg from '../../Assets/ponzu.png';
import yogurtImg from '../../Assets/yogurt.png';

const SAUCES_DATA = [
  {
    id: 'soia',
    name: 'Salsa di soia',
    desc: 'Classica, sapida e leggera.',
    price: 0,
    image: soiaImg,
  },
  {
    id: 'teriyaki',
    name: 'Teriyaki',
    desc: 'Dolce e densa con note agrodolci.',
    price: 0.5,
    image: teriyakiImg,
  },
  {
    id: 'spicy',
    name: 'Spicy Mayo',
    desc: 'Cremosa con un tocco piccante.',
    price: 0.5,
    image: spicyImg,
  },
  { id: 'ponzu', name: 'Ponzu', desc: 'Fresca e agrumata.', price: 0, image: ponzuImg },
  { id: 'yogurt', name: 'Yogurt', desc: 'Delicata e vellutata.', price: 0, image: yogurtImg },
];

export default function Salse() {
  const { type, initialize, selections, updateSelection, getLimits } = useConfigurator();
  const navigate = useNavigate();

  const [selectedSalse, setSelectedSalse] = useState(selection?.salse || []);

  const limits = getLimits(selections?.size);
  const selectedSize = selections?.size || 'Regular';
  const selectedBase = selections?.base || 'Riso venere';

  const basePrice = Number(selections?.basePrice) || 12.5;
  const proteinsExtra = (selections?.proteins || []).reduce((sum, id) => {
    const prices = { salmone: 1.5, tonno: 2, gamberi: 1.8 };
    return sum + (prices[id] || 0);
  }, 0);
  const saucesExtra = SAUCES_DATA.filter((s) => selectedSalse.includes(s.id)).reduce(
    (a, b) => a + b.price,
    0
  );
  const totalPrice = basePrice + proteinsExtra + saucesExtra;

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, [type, initialize]);

  useEffect(() => {
    updateSelection('salse', selectedSalse);
  }, [selectedSalse, updateSelection]);

  const toggleSalsa = (id) => {
    if (selectedSalse.includes(id)) {
      setSelectedSalse(selectedSalse.filter((s) => s !== id));
      return;
    }

    if (selectedSalse.length < limits.salse) {
      setSelectedSalse([...selectedSalse, id]);
    }
  };

  const steps = [
    {
      id: 'base',
      label: 'Base',
      icon: baseIcon,
      completed: true,
    },
    {
      id: 'proteine',
      label: 'Proteine',
      icon: proteineIcon,
      completed: true,
    },
    {
      id: 'condimenti',
      label: 'Condimenti',
      icon: condimentiIcon,
      completed: true,
    },
    {
      id: 'salse',
      label: 'Salse',
      icon: salseIcon,
      completed: false,
    },
  ];

  return (
    <div className={styles.pokePageContainer}>
      <div className={styles.shell}>
        <ConfiguratorSideMenu activeId="salse" items={steps} />

        <main className={styles.pokeMainContent}>
          <header className={styles.contentHeader}>
            <p className={styles.stepIndicator}>STEP 4 DI 4</p>

            <h1>Completa con la tua Salsa</h1>

            <p>Il tocco finale per esaltare ogni sapore del tuo Poke.</p>
          </header>

          <div className={styles.sauceGrid}>
            {SAUCES_DATA.map((sauce) => {
              const selected = selectedSalse.includes(sauce.id);

              return (
                <button
                  key={sauce.id}
                  className={`${styles.sauceCard} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleSalsa(sauce.id)}
                >
                  <div className={styles.imageWrapper}>
                    <img src={sauce.image} alt={sauce.name} />
                  </div>

                  <div className={styles.info}>
                    <div className={styles.header}>
                      <span>{sauce.name}</span>

                      <span className={styles.price}>+€{sauce.price.toFixed(2)}</span>
                    </div>

                    <p>{sauce.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
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
                {selectedSize} + {selectedBase}
              </strong>

              <span>Selezionato</span>
            </div>

            <button className={styles.continueButton} onClick={() => navigate('/riepilogo')}>
              Continua
            </button>
          </>
        }
      />
    </div>
  );
}
