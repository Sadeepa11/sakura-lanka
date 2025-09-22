export default function Input({className = '', ...props}) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm shadow-sm focus:border-[var(--brand)] focus:outline-none ${className}`}
      {...props}
    />
  );
}