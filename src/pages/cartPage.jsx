import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart.Context';
import styles from './cart.module.css';

// Import immagini
import pokeImg from '../Assets/poke_fine.png';
import paninoImg from '../Assets/panino_fine.png';
import friesImg from '../Assets/patatine.png';
import lemonadeImg from '../Assets/limonata.png';
import brownieImg from '../Assets/brownie.png';

const CROSS_SELL_ITEMS = [
  { id: 'c1', name: 'Patatine Dolci', price: 4.0, image: friesImg },
  { id: 'c2', name: 'Limonata Bio', price: 3.5, image: lemonadeImg },
  { id: 'c3', name: 'Choco Brownie', price: 3.0, image: brownieImg },
];

export default function CartPage() {
  const { items, updateQuantity, removeItem, addItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const getItemImage = (item) => {
    if (item.image) return item.image;
    if (item.type === 'poke' || item.name?.toLowerCase().includes('poke')) return pokeImg;
    if (item.type === 'panino' || item.name?.toLowerCase().includes('panino')) return paninoImg;
    return null;
  };

  const addCrossSellItem = (item) => {
    addItem({
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      desc: '',
    });
  };

  const updateQty = (localId, delta) => {
    const item = items.find((i) => i.localId === localId);
    if (item) {
      const newQty = Math.max(1, (item.quantity || 1) + delta);
      updateQuantity(localId, newQty);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const deliveryFee = 2.5;
  const discount = subtotal > 30 ? -2.5 : 0;
  const total = subtotal + deliveryFee + discount;

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        {/* COLONNA SINISTRA: Articoli */}
        <div className={styles.mainColumn}>
          <h1 className={styles.title}>Il Tuo Carrello</h1>

          <div className={styles.cartList}>
            {items.map((item) => (
              <div key={item.localId} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  {getItemImage(item) && <img src={getItemImage(item)} alt={item.name} />}
                </div>

                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h3>{item.name || 'Articolo'}</h3>
                    <span className={styles.itemPrice}>€{(item.price || 0).toFixed(2)}</span>
                  </div>
                  <p className={styles.itemDesc}>{item.desc || ''}</p>

                  <div className={styles.itemActions}>
                    <div className={styles.links}>
                      <button onClick={() => navigate(`/edit/${item.localId}`)}>Modifica</button>
                      <span className={styles.divider}>|</span>
                      <button onClick={() => removeItem(item.localId)}>Rimuovi</button>
                    </div>

                    <div className={styles.qtySelector}>
                      <button onClick={() => updateQty(item.localId, -1)}>−</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQty(item.localId, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CROSS SELL SECTION */}
          <div className={styles.crossSellSection}>
            <h2>Completa il Tuo Pasto</h2>
            <div className={styles.crossSellGrid}>
              {CROSS_SELL_ITEMS.map((item) => (
                <div key={item.id} className={styles.crossSellCard}>
                  <div className={styles.csImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.csInfo}>
                    <div className={styles.csTexts}>
                      <h4>{item.name}</h4>
                      <p>€{item.price.toFixed(2)}</p>
                    </div>
                    <button className={styles.addBtn} onClick={() => addCrossSellItem(item)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNA DESTRA: Riepilogo (Sticky Sidebar) */}
        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h3>Riepilogo Ordine</h3>

            <div className={styles.summaryRow}>
              <span>Subtotale</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Costo Consegna</span>
              <span>€{deliveryFee.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.discount}`}>
              <span>Sconto (Free Delivery &gt; €30)</span>
              <span>-€{Math.abs(discount).toFixed(2)}</span>
            </div>

            <hr className={styles.hr} />

            <div className={styles.totalRow}>
              <span>Totale</span>
              <span className={styles.totalAmount}>€{total.toFixed(2)}</span>
            </div>

            <div className={styles.promoSection}>
              <label>CODICE PROMOZIONALE</label>
              <div className={styles.promoInput}>
                <input
                  type="text"
                  placeholder="Inserisci codice"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button>Applica</button>
              </div>
            </div>

            <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
              Procedi al Checkout <span className={styles.arrow}>→</span>
            </button>

            <div className={styles.secureBadge}>
              <span className={styles.lockIcon}>🔒</span>
              Pagamento Sicuro & Criptato
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
