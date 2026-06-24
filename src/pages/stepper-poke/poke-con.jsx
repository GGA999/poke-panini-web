import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../../context/ConfiguratorContext';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';
import Alert from '../../components/Alert';
import styles from './Poke-con.module.css';

// Icone del Menu Laterale
import baseIcon from '../../Assets/base.svg';
import proteineIcon from '../../Assets/proteine.svg';
import condimentiIcon from '../../Assets/condimenti.svg';
import salseIcon from '../../Assets/salse.svg';

// Immagini degli ingredienti (Condimenti e Topping)
import avocadoImg from '../../Assets/avocado.png';
import edamameImg from '../../Assets/asparagi.png'; // Controlla se si chiama asparagi o edamame nel file system
import cetrioloImg from '../../Assets/cetriolo.png';
import caroteImg from '../../Assets/carote.png';
import mangoImg from '../../Assets/mango.png';
import cavoloRossoImg from '../../Assets/cavolo.png';
import maisImg from '../../Assets/mais.png';
import cipollaImg from '../../Assets/cipolla.png';
import sesamoImg from '../../Assets/sesamo.png';
import algheImg from '../../Assets/alghe.png';

const INGREDIENTS_DATA = [
  { id: 'avocado', name: 'Avocado', image: avocadoImg },
  { id: 'edamame', name: 'Edamame', image: edamameImg },
  { id: 'cetriolo', name: 'Cetriolo', image: cetrioloImg },
  { id: 'carote', name: 'Carote', image: caroteImg },
  { id: 'mango', name: 'Mango', image: mangoImg },
  { id: 'cavolo_rosso', name: 'Cavolo rosso', image: cavoloRossoImg },
  { id: 'mais', name: 'Mais', image: maisImg },
  { id: 'cipolla_croccante', name: 'Cipolla croccante', image: cipollaImg },
  { id: 'sesamo', name: 'Sesamo', image: sesamoImg },
  { id: 'alghe', name: 'Alghe', image: algheImg },
];

export default function PokeConfigurator() {
  const { type, initialize, selections, updateSelection, getLimits } = useConfigurator();

  const limits = getLimits(selections?.size);
  const navigate = useNavigate();

  // Recupera i dati salvati dallo step precedente (o usa fallback)
  const selectedSize = selections?.size || 'Regular';
  const selectedBase = selections?.base || 'Riso venere';

  const [selectedIngredients, setSelectedIngredients] = useState(selections?.condimenti || []);

  const hasProteine = true;
  const hasSalse = false;

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return;
    const t = window.setTimeout(() => setAlert(null), 3000);
    return () => window.clearTimeout(t);
  }, [alert]);

  // Configurazione dei passaggi per il menu laterale (come nel primo step)

  const steps = [
    { id: 'base', label: 'Base', icon: baseIcon, disabled: false },
    { id: 'proteine', label: 'Proteine', icon: proteineIcon, disabled: !hasProteine },
    { id: 'condimenti', label: 'Condimenti', icon: condimentiIcon, disabled: false },
    { id: 'salse', label: 'Salse', icon: salseIcon, disabled: !hasSalse },
  ];

  const basePrice = Number(selections?.basePrice) || 12.5;
  const proteinsExtra = (selections?.proteins || []).reduce((sum, id) => {
    const prices = { salmone: 1.5, tonno: 2, gamberi: 1.8 }; // solo quelli a pagamento
    return sum + (prices[id] || 0);
  }, 0);
  const currentPrice = basePrice + proteinsExtra;

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, [type, initialize]);

  // Sincronizza lo stato locale dei condimenti con il context globale
  useEffect(() => {
    updateSelection('condimenti', selectedIngredients);
  }, [selectedIngredients, updateSelection]);

  const toggleIngredient = (id) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== id));
      return;
    }

    if (selectedIngredients.length >= limits.condimenti) {
      setAlert({
        variant: 'warning',
        title: 'Limite ingredienti raggiunto',
        description: `Puoi selezionare un massimo di ${limits.condimenti} ingredienti`,
      });
      return;
    }

    setSelectedIngredients([...selectedIngredients, id]);
  };

  return (
    <div className={styles.pokePageContainer}>
      {alert ? (
        <Alert
          variant={alert.variant}
          title={alert.title}
          description={alert.description}
          onClose={() => setAlert(null)}
          className={styles.alert}
        />
      ) : null}
      <div className={styles.shell}>
        {/* Menu Laterale di Sinistra configurato correttamente */}
        <ConfiguratorSideMenu activeId="condimenti" items={steps} />

        {/* Contenuto Centrale del Configuratore */}
        <main className={styles.pokeMainContent}>
          <header className={styles.contentHeader}>
            <p className={styles.stepIndicator}>STEP 3 DI 4</p>
            <h1 className={styles.configuratorTitle}>Personalizza con Verdure e Topping</h1>
            <p className={styles.configuratorSubtitle}>
              Scegli fino a 5 ingredienti per rendere il tuo Poke unico e croccante.
            </p>
          </header>

          <div className={styles.ingredientsGrid}>
            {INGREDIENTS_DATA.map((ingredient) => {
              const isSelected = selectedIngredients.includes(ingredient.id);
              return (
                <button
                  key={ingredient.id}
                  className={`${styles.ingredientCard} ${isSelected ? styles.selected : ''}`}
                  type="button"
                  onClick={() => toggleIngredient(ingredient.id)}
                  aria-pressed={isSelected}
                >
                  <div className={styles.ingredientImageWrapper}>
                    <img src={ingredient.image} alt={ingredient.name} />
                  </div>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                </button>
              );
            })}
          </div>
        </main>
      </div>

      {/* Barra di Azione Inferiore configurata con le props left e right */}
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
              onClick={() => navigate('/poke_salse')}
            >
              Continua
            </button>
          </>
        }
      />
    </div>
  );
}
