export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Errore</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Riprova</button>
    </div>
  );
}
