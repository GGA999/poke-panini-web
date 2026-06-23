import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Poke = lazy(() => import('./pages/Poke'));
const Panino = lazy(() => import('./pages/Panino'));
const Ricette = lazy(() => import('./pages/Ricette'));
const Carrello = lazy(() => import('./pages/Carrello'));
const Ordine = lazy(() => import('./pages/Ordine'));
const Poke2 = lazy(() => import('./pages/poke2'));

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: withSuspense(Home),
        },
        {
          path: 'poke',
          element: withSuspense(Poke),
        },
        {
          path: 'panino',
          element: withSuspense(Panino),
        },
        {
          path: 'ricette',
          element: withSuspense(Ricette),
        },
        {
          path: 'carrello',
          element: withSuspense(Carrello),
        },
        {
          path: 'ordine/:id',
          element: withSuspense(Ordine),
        },
        {
          path: 'poke2',
          element: withSuspense(Poke2),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || '/',
  }
);
