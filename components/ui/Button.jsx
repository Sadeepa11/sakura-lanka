export default function Button({variant = 'primary', className = '', disabled, children, ...props}) {
  const base = 'btn';
  const styles = {
    primary: 'bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] shadow-card',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
    outline: 'border border-[var(--brand)] text-[var(--brand)] hover:bg-brand-soft',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    'danger-outline': 'border border-red-600 text-red-700 hover:bg-red-50'
  }[variant] || 'bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)]';
  const state = disabled ? 'opacity-60 cursor-not-allowed' : '';
  return (
    <button className={`${base} ${styles} ${state} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}