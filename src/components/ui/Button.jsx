import './ui.css';

const variantClass = {
  primary: 'ui-button ui-button--primary',
  secondary: 'ui-button ui-button--secondary',
  ghost: 'ui-button ui-button--ghost',
};

const sizeClass = {
  sm: 'ui-button--sm',
  md: 'ui-button--md',
  lg: 'ui-button--lg',
};

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const classes = [variantClass[variant] || variantClass.primary, sizeClass[size] || sizeClass.md, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type={props.type || 'button'} {...props}>
      {children}
    </button>
  );
}
