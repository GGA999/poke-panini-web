import { useConfigurator } from '../context/ConfiguratorContext';
import { useEffect, useState } from 'react';
import styles from './poke.module.css';

export default function Poke() {
  const { initialize, type } = useConfigurator();

  // Stati per gestire la selezione delle card nelle due sezioni
  const [sezione1Siz, setSezione1Size] = useState('');
  const [sezione2Size, setSezione2Size] = useState('');

  useEffect(() => {
    if (type !== 'poke') {
      initialize('poke');
    }
  }, [type, initialize]);

  return (
    <div className={styles['page-wrapper']}>
    <header className={styles['hero-header']}></header>
      {/* CORPO CENTRALE (Menu a sinistra + Contenuto a destra) */}
      <div className={styles['main-layout']}>
        
        {/* 2. MENU VERTICALE (A Sinistra) */}
        <aside className={styles['sidebar-menu']}>
          <h1 className={styles['title']}>Il Tuo Mix</h1>
          <h5 className={styles['subbtitle']}>Personalizza il tuo ordine</h5>
          <ul>
            <li className={styles['menu-item-active']}>Base</li>
            <li className={styles['menu-item-not-active']}>Proteine</li>
            <li className={styles['menu-item-not-active']}>Condimenti</li>
            <li className={styles['menu-item-not-active']}>Salse</li>
          </ul>
        </aside>

        {/* CONTENUTO DELLA PAGINA (A Destra) */}
        <main className={styles['sections-container']}>
                  <h1>Crea il tuo mix perfetto.</h1>
        <p>Scegli tra la freschezza esotica delle nostre Poke o il calore dei nostri Panini.</p>
          {/* SEZIONE 1 */}
          <section className={styles['content-section']}>
            <p className={styles['section-text']}>
              Seleziona la dimensione ideale per la tua Poke Bowl personalizzata.
            </p>
            
            <div className={styles['cards-grid']}>
              <div 
                className={`${styles['card']} ${sezione1Siz === 'small' ? styles['card-active'] : ''}`}
                onClick={() => setSezione1Size('small')}
              >
                Small
              </div>
              <div 
                className={`${styles['card']} ${sezione1Siz === 'regular' ? styles['card-active'] : ''}`}
                onClick={() => setSezione1Size('regular')}
              >
                Regular
              </div>
              <div 
                className={`${styles['card']} ${sezione1Siz === 'large' ? styles['card-active'] : ''}`}
                onClick={() => setSezione1Size('large')}
              >
                Large
              </div>
            </div>
          </section>

          {/* SEZIONE 2 */}
          <section className={styles['content-section']}>
            <p className={styles['section-text']}>
              Scegli la dimensione della bevanda o del contorno da abbinare al menu.
            </p>
            
            <div className={styles['cards-grid']}>
              <div 
                className={`${styles['card']} ${sezione2Size === 'small' ? styles['card-active'] : ''}`}
                onClick={() => setSezione2Size('small')}
              >
                Small
              </div>
              <div 
                className={`${styles['card']} ${sezione2Size === 'regular' ? styles['card-active'] : ''}`}
                onClick={() => setSezione2Size('regular')}
              >
                Regular
              </div>
              <div 
                className={`${styles['card']} ${sezione2Size === 'large' ? styles['card-active'] : ''}`}
                onClick={() => setSezione2Size('large')}
              >
                Large
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* 3. FOOTER FINALE */}
      <footer className={styles['page-footer']}>
        <div className={styles['footer-price']}>
          <span>Totale:</span> <strong>€ 12,50</strong>
        </div>
        <button className={styles['footer-button']}>
          Avanti
        </button>
      </footer>

    </div>
  );
}