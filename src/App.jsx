import { Routes, Route } from 'react-router-dom';
import { HomePage } from './features/products/HomePage';
import { CheckoutPage } from './features/cart/CheckoutPage';
import { OrdersPage } from './features/orders/OrdersPage';
import { TrackingPage } from './features/orders/TrackingPage';
import { NotFoundPage } from './features/orders/NotFoundPage';
import { MainLayout } from './layouts/MainLayout';
import { CheckoutLayout } from './layouts/CheckoutLayout';
import { SimpleLayout } from './layouts/SimpleLayout';
import './App.css';

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage />} />
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;


