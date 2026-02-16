interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}

export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
}
