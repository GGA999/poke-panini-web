const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(
  /\/$/,
  ''
);

export async function getRecommendedSandwiches({ signal } = {}) {
  const url = new URL(`${API_BASE_URL}/api/v1/brand-recipes`);
  url.searchParams.set('type', 'sandwich');
  url.searchParams.set('featured', 'true');
  url.searchParams.set('limit', '3');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error('Impossibile caricare i panini consigliati.');
  }

  const payload = await response.json();

  return Array.isArray(payload.data) ? payload.data : [];
}
