import { Routes, Route } from "react-router-dom";
import { HomePage } from "./features/products/HomePage";
import { CheckoutPage } from "./features/cart/CheckoutPage";
import { OrdersPage } from "./features/orders/OrdersPage";
import { TrackingPage } from "./features/orders/TrackingPage";
import { NotFoundPage } from "./features/orders/NotFoundPage";
import { MainLayout } from "./layouts/MainLayout";
import { CheckoutLayout } from "./layouts/CheckoutLayout";
import { SimpleLayout } from "./layouts/SimpleLayout";
import useAuth from "./hooks/useAuth";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  const { user, loading, isAuthenticated } = useAuth();

  console.log("User:", user);
  console.log("Loading:", loading);
  console.log("Authenticated:", isAuthenticated);

  return (
    <Routes>

  {/* Public */}
  <Route element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route
      path="forgot-password"
      element={<ForgotPasswordPage />}
    />
  </Route>

  {/* Protected */}
  <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>
      <Route path="orders" element={<OrdersPage />} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage />}
      />
    </Route>

    <Route element={<CheckoutLayout />}>
      <Route path="checkout" element={<CheckoutPage />} />
    </Route>
  </Route>

  {/* 404 */}
  <Route element={<SimpleLayout />}>
    <Route path="*" element={<NotFoundPage />} />
  </Route>

</Routes>
  );
}

export default App;