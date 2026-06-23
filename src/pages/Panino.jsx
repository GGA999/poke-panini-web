import { useConfigurator } from '../context/ConfiguratorContext';
import { useEffect } from 'react';

export default function Panino() {
  const { initialize, type } = useConfigurator();

  useEffect(() => {
    if (type !== 'panino') {
      initialize('panino');
    }
  }, []);

  return (
    <div>
      <h1>Configuratore Panino</h1>
    </div>
  );
}
