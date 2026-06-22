import { useParams } from 'react-router-dom';

export default function Ordine() {
  const { id } = useParams();

  return (
    <div>
      <h1>Conferma Ordine #{id}</h1>
    </div>
  );
}
