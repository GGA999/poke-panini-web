import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MiniCart from '../components/MiniCart';

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <MiniCart />
    </div>
  );
}
