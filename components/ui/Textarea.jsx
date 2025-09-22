export default function Textarea({className = '', ...props}) {
  return (
    <textarea
      className={`w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm shadow-sm focus:border-[var(--brand)] focus:outline-none min-h-[120px] ${className}`}
      {...props}
    />
  );
}