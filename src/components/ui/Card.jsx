import './ui.css';

export function Card({ children, className = '', ...props }) {
  const classes = ['ui-card', className].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
