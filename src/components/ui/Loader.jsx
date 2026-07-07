import './ui.css';

export function Loader({ label = 'Loading...', className = '' }) {
  const classes = ['ui-loader', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className="ui-loader-spinner" aria-hidden="true" />
      <span className="ui-loader-label">{label}</span>
    </div>
  );
}
