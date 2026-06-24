import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/Cart.Context';
import { useConfigurator } from '../../context/ConfiguratorContext';
import styles from './poke_fine.module.css';

const STORAGE_KEY = 'poke-panini-web:configurator';

const PROTEIN_OPTIONS = {
  salmone: { label: 'Salmone', price: 1.5 },
  tonno: { label: 'Tonno', price: 2 },
  pollo: { label: 'Pollo', price: 0 },
  gamberi: { label: 'Gamberi', price: 1.8 },
  tofu: { label: 'Tofu', price: 0 },
  uovo: { label: 'Uovo', price: 0 },
};

const CONDIMENT_OPTIONS = {
  avocado: 'Avocado',
  edamame: 'Edamame',
  cetriolo: 'Cetriolo',
  carote: 'Carote',
  mango: 'Mango',
  cavolo_rosso: 'Cavolo rosso',
  mais: 'Mais',
  cipolla_croccante: 'Cipolla croccante',
  sesamo: 'Sesamo',
  alghe: 'Alghe',
};

const SAUCE_OPTIONS = {
  soia: { label: 'Salsa di soia', price: 0 },
  teriyaki: { label: 'Teriyaki', price: 0.5 },
  spicy: { label: 'Spicy Mayo', price: 0.5 },
  ponzu: { label: 'Ponzu', price: 0 },
  yogurt: { label: 'Yogurt', price: 0 },
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

export default function PokeOrder() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { selections, pricing, reset } = useConfigurator();
  const savedConfigurator = useMemo(readSavedConfigurator, []);
  const savedSelections = savedConfigurator.selections || {};

  const orderSelections = {
    ...selections,
    ...savedSelections,
  };

  const size = orderSelections.size || 'Regular';
  const base = orderSelections.base || 'Riso venere';
  const proteins = useMemo(() => orderSelections.proteins || [], [orderSelections.proteins]);
  const condiments = useMemo(() => orderSelections.condimenti || [], [orderSelections.condimenti]);
  const sauces = useMemo(() => orderSelections.salse || [], [orderSelections.salse]);

  const fallbackPokePrice = useMemo(() => {
    const basePrice = Number(orderSelections.basePrice) || 12.5;
    const proteinsTotal = proteins.reduce((sum, id) => sum + (PROTEIN_OPTIONS[id]?.price || 0), 0);
    const saucesTotal = sauces.reduce((sum, id) => sum + (SAUCE_OPTIONS[id]?.price || 0), 0);
    return basePrice + proteinsTotal + saucesTotal;
  }, [orderSelections.basePrice, proteins, sauces]);

  const pokePrice = Number(savedConfigurator.pricing ?? pricing ?? fallbackPokePrice);
  const [extras, setExtras] = useState({});

  const extrasTotal = EXTRA_PRODUCTS.reduce(
    (sum, product) => sum + (extras[product.id] || 0) * product.price,
    0
  );
  const totalPrice = pokePrice + extrasTotal;

  const addExtra = (productId) => {
    setExtras((previous) => ({
      ...previous,
      [productId]: (previous[productId] || 0) + 1,
    }));
  };

  const goToConfigurator = () => navigate('/poke');

  const handleAddToCart = () => {
    addItem({
      name: `Poke Bowl ${size}`,
      price: totalPrice,
      quantity: 1,
      selections: orderSelections,
      extras: EXTRA_PRODUCTS.filter((product) => extras[product.id]).map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: extras[product.id],
      })),
    });
    reset();
    setExtras({});
    navigate('/carrello');
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
          <Link to="/poke">Configuratore</Link> &gt;{' '}
          <span className={styles['breadcrumb-active']}>Riepilogo Finale</span>
        </p>
        <h1 className={styles['main-title']}>Il Tuo Capolavoro</h1>
        <p className={styles.subtitle}>Controlla gli ingredienti e preparati al primo morso.</p>
      </div>

      <div className={styles['main-content']}>
        <div className={styles['selection-card']}>
          <div className={styles['selection-image-container']}>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
              alt="Poke Bowl"
              className={styles['poke-image']}
            />
            <span className={styles.badge}>Poke Bowl {size}</span>
          </div>

          <div className={styles['selection-details']}>
            <div className={styles['selection-header']}>
              <h2>La Tua Selezione</h2>
              <span className={styles.price}>{formatPrice(pokePrice)}</span>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>BASE</h3>
              <div className={styles.tags}>{renderChip(base)}</div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>PROTEINE</h3>
              <div className={styles.tags}>
                {proteins.length
                  ? toLabels(proteins, PROTEIN_OPTIONS, 'Proteina').map(renderChip)
                  : renderChip('Nessuna proteina')}
              </div>
            </div>

            <div className={styles['ingredient-group']}>
              <h3>CONDIMENTI</h3>
              <div className={styles.tags}>
                {condiments.length
                  ? toLabels(condiments, CONDIMENT_OPTIONS, 'Condimento').map(renderChip)
                  : renderChip('Nessun condimento')}
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
            <span>Poke Bowl {size}</span>
            <span>{formatPrice(pokePrice)}</span>
          </div>
          {EXTRA_PRODUCTS.filter((product) => extras[product.id]).map((product) => (
            <div className={styles['summary-row']} key={product.id}>
              <span>
                {product.name} x{extras[product.id]}
              </span>
              <span>{formatPrice(product.price * extras[product.id])}</span>
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
