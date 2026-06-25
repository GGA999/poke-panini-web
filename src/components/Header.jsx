import { Link } from 'react-router-dom';
import img from '../Assets/logo.png';
import styles from './Header.module.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useCart } from '../context/Cart.Context';

export default function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Sinistra: logo + testo */}
        <Link to="/" className={styles.logo}>
          <img src={img} alt="Poke & Panini" />
          <p className={styles.logo_text}>Poke & Panini</p>
        </Link>

        {/* Centro: (vuoto) */}
        <div className={styles.spacer} />

        {/* Destra: menu ordini + carrello */}
        <div className={styles.navRight}>
          <nav className={styles.navRightMenu}>
            <Link to="/poke">Configuratore</Link>
          </nav>
          <nav className={styles.navRightMenu}>
            <Link to="/Ordini">Ordini</Link>
          </nav>
          <nav className={styles.navRightMenu}>
            <Link to="/Menu">Menu</Link>
          </nav>
          <Link to="/cartPage" className={styles.cartIcon} aria-label="Carrello">
            <MdOutlineShoppingCart />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
