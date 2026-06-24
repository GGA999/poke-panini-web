import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { CartProvider } from './context/Cart.Context';
import { ConfiguratorProvider } from './context/ConfiguratorContext';
import { router } from './router';
import { ErrorFallback } from './components/ErrorBoundary';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 10, // 10 min (ex cacheTime)
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => (window.location.href = '/')}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ConfiguratorProvider>
            <RouterProvider router={router} />
          </ConfiguratorProvider>
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
