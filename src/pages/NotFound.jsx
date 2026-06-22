import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Pagina non trovata</h1>
      <Link to="/">Torna alla home</Link>
    </div>
  );
}
