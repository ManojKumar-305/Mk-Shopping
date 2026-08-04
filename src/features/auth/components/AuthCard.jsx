import "./AuthCard.css";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1 className="auth-title">{title}</h1>

        {subtitle && (
          <p className="auth-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      <div className="auth-card-body">
        {children}
      </div>

      {footer && (
        <div className="auth-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}