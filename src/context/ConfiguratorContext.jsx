import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const ConfiguratorContext = createContext(undefined);

const STORAGE_KEY = 'poke-panini-web:configurator';

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function ConfiguratorProvider({ children }) {
  const [type, setType] = useState(null); // 'poke' | 'panino'
  const [selections, setSelections] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [pricing, setPricing] = useState(null);

  // Carica i dati salvati (temporanei) quando la pagina viene ricaricata
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed = safeParse(raw, null);
    if (!parsed || typeof parsed !== 'object') return;

    if (parsed.type) setType(parsed.type);
    if (parsed.selections && typeof parsed.selections === 'object')
      setSelections(parsed.selections);
    if (typeof parsed.currentStep === 'number') setCurrentStep(parsed.currentStep);
    if (parsed.pricing !== undefined) setPricing(parsed.pricing);
  }, []);

  // Salva automaticamente ogni modifica allo stato configuratore
  useEffect(() => {
    const payload = {
      type,
      selections,
      currentStep,
      pricing,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [type, selections, currentStep, pricing]);

  // IMPORTANTISSIMO:
  // initialize() deve ripulire SOLO quando serve (tipicamente quando l’utente
  // parte da zero). Se l’utente è già in mezzo al configuratore, non dobbiamo
  // sovrascrivere localStorage.
  const initialize = useCallback((configuratorType) => {
    setType((prevType) => {
      // Se stiamo passando da non-inizializzato a un tipo, ok.
      if (!prevType) return configuratorType;
      // Se il tipo è lo stesso, NON reimpostare selections.
      return prevType;
    });

    setSelections((prevSelections) => {
      // Se non c'erano selections ancora, inizializza.
      if (prevSelections && Object.keys(prevSelections).length > 0) return prevSelections;
      return {};
    });

    setCurrentStep((prevStep) => (prevStep || prevStep === 0 ? prevStep : 0));
    setPricing((prevPricing) => (prevPricing === null ? null : prevPricing));
  }, []);

  const updateSelection = useCallback((category, value, multiSelect = false) => {
    setSelections((prev) => {
      if (multiSelect) {
        const current = prev[category] || [];
        const isSelected = current.includes(value);
        return {
          ...prev,
          [category]: isSelected ? current.filter((v) => v !== value) : [...current, value],
        };
      }
      return { ...prev, [category]: value };
    });
  }, []);

  const reset = useCallback(() => {
    setType(null);
    setSelections({});
    setCurrentStep(0);
    setPricing(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      type,
      selections,
      currentStep,
      pricing,
      initialize,
      updateSelection,
      setCurrentStep,
      setPricing,
      reset,
    }),
    [type, selections, currentStep, pricing, initialize, updateSelection, reset]
  );

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within ConfiguratorProvider');
  }
  return context;
}
