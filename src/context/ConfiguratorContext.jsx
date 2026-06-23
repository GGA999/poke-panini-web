import { createContext, useContext, useState, useCallback } from 'react';

const ConfiguratorContext = createContext(undefined);

export function ConfiguratorProvider({ children }) {
  const [type, setType] = useState(null); // 'poke' | 'panino'
  const [selections, setSelections] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [pricing, setPricing] = useState(null);

  const initialize = useCallback((configuratorType) => {
    setType(configuratorType);
    setSelections({});
    setCurrentStep(0);
    setPricing(null);
  }, []);

  const updateSelection = useCallback((category, value, multiSelect = false) => {
    setSelections((prev) => {
      if (multiSelect) {
        const current = prev[category] || [];
        const isSelected = current.includes(value);
        return {
          ...prev,
          [category]: isSelected
            ? current.filter((v) => v !== value)
            : [...current, value],
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
  }, []);

  const value = {
    type,
    selections,
    currentStep,
    pricing,
    initialize,
    updateSelection,
    setCurrentStep,
    setPricing,
    reset,
  };

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within ConfiguratorProvider');
  }
  return context;
}
