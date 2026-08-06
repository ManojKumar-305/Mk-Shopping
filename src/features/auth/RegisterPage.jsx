import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthPageShell from "./components/AuthPageShell";
import RegisterForm from "./components/RegisterForm";

import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleRegister(formData) {
    try {
      setLoading(true);

      await register(
        formData.fullName,
        formData.email,
        formData.password
      );

      toast.success(
        "Account created successfully! Please sign in."
      );

      navigate("/login", {
        replace: true,
      });

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageShell
      title="Create Account"
      subtitle="Join MK Tech Store today"
      footer={
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      }
    >
      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
      />
    </AuthPageShell>
  );
}