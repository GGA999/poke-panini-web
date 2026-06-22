import { Link } from 'react-router-dom';
import { useCart } from '../context/Cart.Context';

export default function MiniCart() {
  const { items } = useCart();
  const count = items.length;

  return (
    <Link to="/carrello">
      🛒
      {count > 0 && <span>{count}</span>}
    </Link>
  );
}
