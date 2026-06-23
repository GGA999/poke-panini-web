import { useEffect, useState } from 'react';
import { useConfigurator } from '../context/ConfiguratorContext';
import BottomActionBar from '../components/BottomActionBar';
import ConfiguratorSideMenu from '../components/ConfiguratorSideMenu';
import './poke2.css';

// Dati mockati per le opzioni delle proteine basati sull'immagine
const PROTEIN_OPTIONS = [
  { id: 'salmone', name: 'Salmone', desc: 'Fresco e marinato', price: 1.50, image: '/images/salmone.jpg' },
  { id: 'tonno', name: 'Tonno', desc: 'Qualità sashimi', price: 2.00, image: '/images/tonno.jpg' },
  { id: 'pollo', name: 'Pollo', desc: 'Grigliato al naturale', price: 0, image: '/images/pollo.jpg' },
  { id: 'gamberi', name: 'Gamberi', desc: 'Al vapore, delicati', price: 1.80, image: '/images/gamberi.jpg' },
  { id: 'tofu', name: 'Tofu', desc: 'Bio e proteico', price: 0, image: '/images/tofu.jpg' },
  { id: 'uovo', name: 'Uovo', desc: 'Barzotto, km 0', price: 0, image: '/images/uovo.jpg' },
];

export default function ProteineConfigurator() {
  // Assumiamo che il contesto metta a disposizione le info necessarie e la funzione per aggiornare lo stato globale
  const { currentSelection, updateSelection } = useConfigurator();
  const [selectedProteins, setSelectedProteins] = useState([]);

  // Sincronizza lo stato locale con il contesto se necessario
  useEffect(() => {
    if (currentSelection?.proteins) {
      setSelectedProteins(currentSelection.proteins);
    }
  }, [currentSelection]);

  const handleSelectProtein = (id) => {
    setSelectedProteins((prev) => {
      if (prev.includes(id)) {
        // Rimuovi se già selezionato
        const updated = prev.filter((item) => item !== id);
        updateSelection?.({ proteins: updated });
        return updated;
      } else {
        // Limite di massimo 2 opzioni
        if (prev.length >= 2) return prev;
        const updated = [...prev, id];
        updateSelection?.({ proteins: updated });
        return updated;
      }
    });
  };

  return (
    <div className="configurator-container">
      {/* Menu Laterale */}
      <ConfiguratorSideMenu currentStep="proteine" />

      {/* Contenuto Principale */}
      <main className="configurator-content">
        <header className="content-header">
          <span className="step-indicator">STEP 2 DI 4</span>
          <h1>Scegli le tue Proteine</h1>
          <p>Seleziona fino a 2 opzioni per la tua base. Ogni scelta aggiunge freschezza e gusto al tuo Poke.</p>
        </header>

        {/* Griglia delle Proteine */}
        <div className="options-grid">
          {PROTEIN_OPTIONS.map((protein) => {
            const isSelected = selectedProteins.includes(protein.id);
            return (
              <div
                key={protein.id}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectProtein(protein.id)}
              >
                <div className="image-container">
                  <img src={protein.image} alt={protein.name} />
                </div>
                <div className="card-info">
                  <div className="text-group">
                    <h3>{protein.name}</h3>
                    <p>{protein.desc}</p>
                  </div>
                  <span className="price-tag">
                    {protein.price > 0 ? `+€${protein.price.toFixed(2)}` : 'Incluso'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Barra delle Azioni Inferiore */}
      <BottomActionBar 
        totalPrice={12.50} // Sostituisci con il calcolo dinamico del tuo contesto
        summaryText="Regular + Riso Venere" 
        buttonText="Continua"
        onNext={() => console.log('Prossimo step')}
      />
    </div>
  );
}