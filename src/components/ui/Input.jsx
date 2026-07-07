import './ui.css';

export function Input({ id, label, error, className = '', ...props }) {
  const classes = ['ui-input', error ? 'ui-input--error' : '', className].filter(Boolean).join(' ');

  return (
    <div className="ui-input-wrapper">
      {label && (
        <label className="ui-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={classes} {...props} />
      {error && <div className="ui-input-error">{error}</div>}
    </div>
  );
}
