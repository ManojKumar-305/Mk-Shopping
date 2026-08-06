import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthPageShell from "./components/AuthPageShell";
import LoginForm from "./components/LoginForm";

import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleLogin(formData) {
    try {
      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Welcome back!");

      // If user was redirected from a protected page,
      // send them back there. Otherwise go home.
      const redirectTo = location.state?.from?.pathname || "/";

      navigate(redirectTo, {
        replace: true,
      });
    } catch (error) {
      toast.error(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageShell
      title="Welcome Back"
      subtitle="Sign in to continue to MK Tech Store"
      footer={
        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      }
    >
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </AuthPageShell>
  );
}