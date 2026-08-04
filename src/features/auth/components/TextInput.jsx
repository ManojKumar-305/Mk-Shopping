import "./TextInput.css";

export default function TextInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  error = "",
  disabled = false,
  required = false,
  autoComplete,
  autoFocus = false,
  ...props
}) {
  return (
    <div className="text-field">
      {label && (
        <label htmlFor={id} className="text-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="text-input-wrapper">
        {Icon && (
          <Icon
            size={18}
            className="text-input-icon"
          />
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`text-input ${
            error ? "input-error" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : undefined
          }
          {...props}
        />
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}