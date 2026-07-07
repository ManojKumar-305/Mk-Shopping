import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function CheckoutLayout() {
  return (
    <>
      <Header />
      <main className="checkout-layout">
        <Outlet />
      </main>
    </>
  );
}
