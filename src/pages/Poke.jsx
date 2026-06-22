import { useConfigurator } from '../context/ConfiguratorContext';
import { useEffect } from 'react';

export default function Poke() {
  const { initialize, type } = useConfigurator();

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, []);

  return (
    <div>
      <h1>Configuratore Poke</h1>
    </div>
  );
}
