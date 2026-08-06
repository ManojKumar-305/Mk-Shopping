import { Routes, Route } from "react-router-dom";

// Pages
import { HomePage } from "./features/products/HomePage";
import { CheckoutPage } from "./features/cart/CheckoutPage";
import { OrdersPage } from "./features/orders/OrdersPage";
import { TrackingPage } from "./features/orders/TrackingPage";
import { NotFoundPage } from "./features/orders/NotFoundPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import Profile from "./pages/Profile";

// Layouts
import { MainLayout } from "./layouts/MainLayout";
import { CheckoutLayout } from "./layouts/CheckoutLayout";
import { SimpleLayout } from "./layouts/SimpleLayout";

// Auth
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

function App() {
  const { loading } = useAuth();

  // Prevent rendering routes until auth state is known
  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="forgot-password"
          element={<ForgotPasswordPage />}
        />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrdersPage />} />

          <Route
            path="tracking/:orderId/:productId"
            element={<TrackingPage />}
          />
        </Route>

        <Route element={<CheckoutLayout />}>
          <Route
            path="checkout"
            element={<CheckoutPage />}
          />
        </Route>

      </Route>

      {/* ================= 404 ================= */}

      <Route element={<SimpleLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

    </Routes>
  );
}

export default App;