import { useCart } from '../context/Cart.Context';
import { Link } from 'react-router-dom';

export default function Carrello() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Carrello vuoto</h1>
        <Link to="/">Torna alla home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrello ({items.length})</h1>
      <ul>
        {items.map((item) => (
          <li key={item.localId}>
            {item.name || 'Articolo'} - €{item.price || 0}
          </li>
        ))}
      </ul>
      <p>Totale: €{total.toFixed(2)}</p>
    </div>
  );
}
