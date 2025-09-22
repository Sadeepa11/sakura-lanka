export default function Select({className = '', children, ...props}) {
  return (
    <select
      className={`w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm shadow-sm focus:border-[var(--brand)] focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}