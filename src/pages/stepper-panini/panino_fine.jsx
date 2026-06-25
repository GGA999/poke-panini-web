import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/Cart.Context';
import { useConfigurator } from '../../context/ConfiguratorContext';
import styles from './panino_fine.module.css';

// Immagini Extra
import baconImg from '../../Assets/bacon.png';
import uovoImg from '../../Assets/uovo.png';
import cipollaCrocImg from '../../Assets/cipolla.png';
import doppiaCarneImg from '../../Assets/carne.png';

const EXTRAS_DATA = [
  { id: 'bacon', name: 'Bacon Croccante', price: 1.5, image: baconImg },
  { id: 'uovo', name: "Uovo all'Occhio", price: 1.2, image: uovoImg },
  { id: 'cipolla_croccante', name: 'Cipolla Croccante', price: 0.8, image: cipollaCrocImg },
  { id: 'doppia_carne', name: 'Doppia Carne', price: 3.5, image: doppiaCarneImg },
];

const STORAGE_KEY = 'poke-panini-web:configurator';

const PROTEIN_OPTIONS = {
  manzo: { label: 'Manzo', price: 0 },
  pollo: { label: 'Pollo', price: 0.5 },
  cotoletta: { label: 'Cotoletta', price: 1 },
  pulled: { label: 'Pulled Pork', price: 2 },
  vegetale: { label: 'Vegetale', price: 1.5 },
};

const CHEESE_OPTIONS = {
  cheddar: 'Cheddar',
  provolone: 'Provolone',
  mozzarella: 'Mozzarella',
  gorgonzola: 'Gorgonzola',
  scamorza: 'Scamorza',
};

const VEGGIE_OPTIONS = {
  lattuga: 'Lattuga',
  pomodoro: 'Pomodoro',
  cipolla: 'Cipolla',
  cetriolo: 'Cetriolo',
  peperoni: 'Peperoni',
  carote: 'Carote',
  rucola: 'Rucola',
};

const SAUCE_OPTIONS = {
  maionese: { label: 'Maionese', price: 0 },
  ketchup: { label: 'Ketchup', price: 0 },
  senape: { label: 'Senape', price: 0 },
  bbq: { label: 'BBQ', price: 0 },
  salsa_piccante: { label: 'Salsa piccante', price: 0 },
};

const EXTRA_PRODUCTS = [
  {
    id: 'limonata-bio',
    name: 'Limonata Bio',
    price: 3.5,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'mochi-selection',
    name: 'Mochi Selection',
    price: 5,
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=300&q=80',
  },
];

function readSavedConfigurator() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function formatPrice(value) {
  return `\u20ac${Number(value || 0).toFixed(2)}`;
}

function toLabels(ids = [], dictionary, fallbackPrefix) {
  return ids.map((id) => dictionary[id]?.label || dictionary[id] || `${fallbackPrefix} ${id}`);
}

export default function PaninoOrder() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { selections, pricing, reset } = useConfigurator();
  const savedConfigurator = useMemo(readSavedConfigurator, []);
  const savedSelections = savedConfigurator.selections || {};

  const orderSelections = {
    ...selections,
    ...savedSelections,
  };

  const size = orderSelections.size || 'Normale';
  const bread = orderSelections.bread || 'Bun Classico';
  const protein = orderSelections.proteina;
  const cheeses = useMemo(() => orderSelections.formaggi || [], [orderSelections.formaggi]);
  const veggies = useMemo(() => orderSelections.verdure || [], [orderSelections.verdure]);
  const sauces = useMemo(() => orderSelections.salse || [], [orderSelections.salse]);
  const extras = useMemo(() => orderSelections.extras || [], [orderSelections.extras]);

  const fallbackPaninoPrice = useMemo(() => {
    const basePrice = Number(orderSelections.basePrice) || 9.5;
    const proteinPrice = PROTEIN_OPTIONS[protein]?.price || 0;
    const veggieExtra = Math.max(0, veggies.length - 3) * 1.5;
    const extrasPrice =
      EXTRAS_DATA?.filter((e) => extras.includes(e.id)).reduce((sum, e) => sum + e.price, 0) || 0;
    return basePrice + proteinPrice + veggieExtra + extrasPrice;
  }, [orderSelections.basePrice, protein, veggies, extras]);

  const paninoPrice = Number(savedConfigurator.pricing ?? pricing ?? fallbackPaninoPrice);
  const [selectedExtras, setSelectedExtras] = useState({});

  const extrasTotal = EXTRA_PRODUCTS.reduce(
    (sum, product) => sum + (selectedExtras[product.id] || 0) * product.price,
    0
  );
  const totalPrice = paninoPrice + extrasTotal;

  const addExtra = (productId) => {
    setSelectedExtras((previous) => ({
      ...previous,
      [productId]: (previous[productId] || 0) + 1,
    }));
  };

  const goToConfigurator = () => navigate('/panino_pane');

  const handleAddToCart = () => {
    addItem({
      name: `Panino ${size}`,
      price: totalPrice,
      quantity: 1,
      selections: orderSelections,
      extras: EXTRA_PRODUCTS.filter((product) => selectedExtras[product.id]).map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: selectedExtras[product.id],
      })),
    });
    reset();
    setSelectedExtras({});
    navigate('/cartPage');
  };

  const renderChip = (label) => (
    <button key={label} type="button" className={styles.tag} onClick={goToConfigurator}>
      {label} <span className={styles['edit-icon']}>Edit</span>
    </button>
  );

  return (
    <div className={styles['order-container']}>
      <div className={styles['order-header-section']}>
        <p className={styles.breadcrumb}>
          <Link to="/panino_pane">Configuratore</Link> &gt;{' '}
          <span className={styles['breadcrumb-active']}>Riepilogo Finale</span>
        </p>
        <h1 className={styles['main-title']}>Il Tuo Panino</h1>
        <p className={styles.subtitle}>Controlla gli ingredienti e preparati al primo morso.</p>
      </div>

      <div className={styles['main-content']}>
        <div className={styles['selection-card']}>
          <div className={styles['selection-image-container']}>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
              alt="Panino"
              className={styles['panino-image']}
            />
            <span className={styles.badge}>Panino {size}</span>
          </div>

          <div className={styles['selection-details']}>
            <div className={styles['selection-header']}>
              <h2>La Tua Selezione</h2>
              <span className={styles.price}>{formatPrice(paninoPrice)}</span>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>DIMENSIONE & PANE</h3>
              <div className={styles.tags}>{renderChip(`${size} + ${bread}`)}</div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>CARNE</h3>
              <div className={styles.tags}>
                {protein
                  ? renderChip(PROTEIN_OPTIONS[protein]?.label || protein)
                  : renderChip('Nessuna carne')}
              </div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>FORMAGGI</h3>
              <div className={styles.tags}>
                {cheeses.length
                  ? toLabels(cheeses, CHEESE_OPTIONS, 'Formaggio').map(renderChip)
                  : renderChip('Nessun formaggio')}
              </div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>VERDURE</h3>
              <div className={styles.tags}>
                {veggies.length
                  ? toLabels(veggies, VEGGIE_OPTIONS, '').map(renderChip)
                  : renderChip('Nessuna verdura')}
              </div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>SALSE</h3>
              <div className={styles.tags}>
                {sauces.length
                  ? toLabels(sauces, SAUCE_OPTIONS, 'Salsa').map(renderChip)
                  : renderChip('Nessuna salsa')}
              </div>
            </div>
          </div>
        </div>

        <div className={styles['summary-card']}>
          <h2>Riepilogo Ordine</h2>
          <div className={styles['summary-row']}>
            <span>Panino {size}</span>
            <span>{formatPrice(paninoPrice)}</span>
          </div>
          {EXTRA_PRODUCTS.filter((product) => selectedExtras[product.id]).map((product) => (
            <div className={styles['summary-row']} key={product.id}>
              <span>
                {product.name} x{selectedExtras[product.id]}
              </span>
              <span>{formatPrice(product.price * selectedExtras[product.id])}</span>
            </div>
          ))}
          <div className={styles['summary-row']}>
            <span>Consegna</span>
            <span className={styles['free-text']}>Gratis</span>
          </div>
          <hr className={styles.divider} />
          <div className={styles['total-row']}>
            <span>Totale</span>
            <span className={styles['total-price']}>{formatPrice(totalPrice)}</span>
          </div>
          <button className={styles['add-to-cart-btn']} type="button" onClick={handleAddToCart}>
            Aggiungi al carrello
          </button>
        </div>
      </div>

      <div className={styles['cross-sell-section']}>
        <h2 className={styles['cross-sell-title']}>Completa il tuo ordine</h2>
        <div className={styles['products-grid']}>
          {EXTRA_PRODUCTS.map((product) => (
            <div className={styles['product-card']} key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className={styles['product-info']}>
                <h3>{product.name}</h3>
                <div className={styles['product-footer']}>
                  <span>{formatPrice(product.price)}</span>
                  <button
                    className={styles['add-btn']}
                    type="button"
                    onClick={() => addExtra(product.id)}
                    aria-label={`Aggiungi ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
