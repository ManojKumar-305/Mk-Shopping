import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import "./PasswordInput.css";

export default function PasswordInput({
  id = "password",
  name = "password",
  label = "Password",
  value,
  onChange,
  placeholder = "Enter your password",
  error = "",
  disabled = false,
  required = false,
  autoComplete = "current-password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-field">
      <label htmlFor={id} className="password-label">
        {label}
      </label>

      <div className="password-input-wrapper">
        <Lock className="password-left-icon" size={18} />

        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          className={`password-input ${error ? "input-error" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        <button
          type="button"
          className="toggle-password-btn"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="password-error">
          {error}
        </p>
      )}
    </div>
  );
}