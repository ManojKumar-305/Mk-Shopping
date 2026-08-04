import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

import { validateLogin } from "../validation";

import "./LoginForm.css";

export default function LoginForm({
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;

      const payload = {
        ...formData,
        email: formData.email.trim(),
      };

      const validationErrors = validateLogin(payload);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});

      try {
        await onSubmit(payload);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [formData, loading, onSubmit]
  );

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <TextInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        icon={Mail}
        error={errors.email}
        autoComplete="email"
        autoFocus
        disabled={loading}
        required
      />

      <PasswordInput
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={loading}
        required
      />

      <div className="login-options">
        <label className="remember-me">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={loading}
            aria-label="Remember me"
          />

          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="forgot-password"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        className="login-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}