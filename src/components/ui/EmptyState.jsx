import './ui.css';

export function EmptyState({ title = 'Nothing here yet', message = 'There is no content to display.', className = '' }) {
  const classes = ['ui-empty-state', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ui-empty-state-icon">⚪</div>
      <div className="ui-empty-state-title">{title}</div>
      <div className="ui-empty-state-message">{message}</div>
    </div>
  );
}
