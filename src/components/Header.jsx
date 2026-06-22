import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">Poke & Panini</Link>
      <nav>
        <Link to="/poke">Configura</Link>
        <Link to="/panino">Menu</Link>
        <Link to="/ricette">Ordini</Link>
        <Link to="/carrello">🛒</Link>
      </nav>
    </header>
  );
}
