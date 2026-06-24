import React, { useState } from 'react';
import styles from './poke-con.module.css';
import ConfiguratorSideMenu from '../../components/ConfiguratorSideMenu';
import BottomActionBar from '../../components/BottomActionBar';

const INGREDIENTS_DATA = [
  { id: 'avocado', name: 'Avocado', image: 'https://via.placeholder.com/100?text=Avocado' },
  { id: 'edamame', name: 'Edamame', image: 'https://via.placeholder.com/100?text=Edamame' },
  { id: 'cetriolo', name: 'Cetriolo', image: 'https://via.placeholder.com/100?text=Cetriolo' },
  { id: 'carote', name: 'Carote', image: 'https://via.placeholder.com/100?text=Carote' },
  { id: 'mango', name: 'Mango', image: 'https://via.placeholder.com/100?text=Mango' },
  { id: 'cavolo_rosso', name: 'Cavolo rosso', image: 'https://via.placeholder.com/100?text=Cavolo+rosso' },
  { id: 'mais', name: 'Mais', image: 'https://via.placeholder.com/100?text=Mais' },
  { id: 'cipolla_croccante', name: 'Cipolla croccante', image: 'https://via.placeholder.com/100?text=Cipolla' },
  { id: 'sesamo', name: 'Sesamo', image: 'https://via.placeholder.com/100?text=Sesamo' },
  { id: 'alghe', name: 'Alghe', image: 'https://via.placeholder.com/100?text=Alghe' },
];

export default function PokeConfigurator() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const toggleIngredient = (id) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== id));
    } else {
      if (selectedIngredients.length < 5) {
        setSelectedIngredients([...selectedIngredients, id]);
      } else {
        alert("Puoi selezionare un massimo di 5 ingredienti!");
      }
    }
  };

  return (
    <div className={styles.pokePageContainer}>
      <main className={styles.pokeMainContent}>
        {/* Menu Laterale di Sinistra */}
        <ConfiguratorSideMenu currentStep="condimenti" />

        {/* Contenuto Centrale del Configuratore */}
        <section className={styles.configuratorSection}>
          <div className={styles.stepIndicator}>STEP 3 DI 4</div>
          <h1 className={styles.configuratorTitle}>Personalizza con Verdure e Topping</h1>
          <p className={styles.configuratorSubtitle}>
            Scegli fino a 5 ingredienti per rendere il tuo Poke unico e croccante.
          </p>

          <div className={styles.ingredientsGrid}>
            {INGREDIENTS_DATA.map((ingredient) => {
              const isSelected = selectedIngredients.includes(ingredient.id);
              return (
                <div
                  key={ingredient.id}
                  className={`${styles.ingredientCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => toggleIngredient(ingredient.id)}
                >
                  <div className={styles.ingredientImageWrapper}>
                    <img src={ingredient.image} alt={ingredient.name} />
                  </div>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Barra di Azione Inferiore */}
      <BottomActionBar 
        totalEstimated="€12.50" 
        selectionText="Regular + Riso Venere Selezionato"
        onContinue={() => console.log('Avanti cliccato', selectedIngredients)}
      />
    </div>
  );
}