import { useState } from "react";
import { Mail, User } from "lucide-react";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

import { validateRegister } from "../validation";

import "./RegisterForm.css";

export default function RegisterForm({
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    const validationErrors = validateRegister(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(formData);
  }

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit}
    >
      <TextInput
        id="fullName"
        name="fullName"
        label="Full Name"
        icon={User}
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
        error={errors.fullName}
        disabled={loading}
        required
      />

      <TextInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
        autoComplete="email"
        disabled={loading}
        required
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="new-password"
        disabled={loading}
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={loading}
        required
      />

      <div className="terms-container">
        <label className="terms-label">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />

          I agree to the Terms & Conditions
        </label>

        {errors.acceptTerms && (
          <span className="form-error">
            {errors.acceptTerms}
          </span>
        )}
      </div>

      <button
        className="register-button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>
    </form>
  );
}