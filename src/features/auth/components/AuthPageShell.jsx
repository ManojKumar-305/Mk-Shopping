import AuthCard from "./AuthCard";
import "../auth.css";

export default function AuthPageShell({
  title,
  subtitle,
  footer,
  children,
}) {
  return (
    <div className="auth-page">
      <AuthCard
        title={title}
        subtitle={subtitle}
        footer={footer}
      >
        {children}
      </AuthCard>
    </div>
  );
}
