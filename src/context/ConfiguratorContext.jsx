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

  useEffect(() => {
    const payload = {
      type,
      selections,
      currentStep,
      pricing,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [type, selections, currentStep, pricing]);

  const initialize = useCallback((configuratorType) => {
    setType((prevType) => {
      if (!prevType) return configuratorType;
      return prevType;
    });

    setSelections((prevSelections) => {
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

  const getLimits = useCallback((size) => {
    switch (size) {
      case 'Small':
        return { proteine: 1, condimenti: 2, salse: 1 };
      case 'Large':
        return { proteine: 3, condimenti: 6, salse: 3 };
      default:
        return { proteine: 2, condimenti: 5, salse: 2 }; // Regular
    }
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
      getLimits,
    }),
    [
      type,
      selections,
      currentStep,
      pricing,
      initialize,
      updateSelection,
      reset,
      getLimits,
    ]
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