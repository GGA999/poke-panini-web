import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Poke = lazy(() => import('./pages/stepper-poke/Poke'));
const Panino = lazy(() => import('./pages/Panino'));
const Ricette = lazy(() => import('./pages/Ricette'));
const cartPage = lazy(() => import('./pages/cartPage'));
const Ordine = lazy(() => import('./pages/Ordine'));
const Poke2 = lazy(() => import('./pages/stepper-poke/Poke-pro'));
const poke_con = lazy(() => import('./pages/stepper-poke/Poke-con'));
const poke_salse = lazy(() => import('./pages/stepper-poke/poke_salse'));
const poke_fine = lazy(() => import('./pages/stepper-poke/poke_fine'));
const panino_pane = lazy(() => import('./pages/stepper-panini/panino_pane'));
const panino_carne = lazy(() => import('./pages/stepper-panini/panino_carne'));
const panino_con = lazy(() => import('./pages/stepper-panini/panino_con'));
const panino_salse = lazy(() => import('./pages/stepper-panini/panino_salse'));
const panino_fine = lazy(() => import('./pages/stepper-panini/panino_fine'));
const emoji = lazy(() => import('./pages/emoji'));

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
          path: 'cartPage',
          element: withSuspense(cartPage),
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
          path: 'poke_con',
          element: withSuspense(poke_con),
        },
        {
          path: 'poke_salse',
          element: withSuspense(poke_salse),
        },
        {
          path: 'poke_fine',
          element: withSuspense(poke_fine),
        },
        {
          path: 'panino_pane',
          element: withSuspense(panino_pane),
        },
        {
          path: 'panino_carne',
          element: withSuspense(panino_carne),
        },
        {
          path: 'panino_con',
          element: withSuspense(panino_con),
        },
        {
          path: 'panino_salse',
          element: withSuspense(panino_salse),
        },
        {
          path: 'panino_fine',
          element: withSuspense(panino_fine),
        },
        {
          path: 'emoji',
          element: withSuspense(emoji),
        }
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || '/',
  }
);
