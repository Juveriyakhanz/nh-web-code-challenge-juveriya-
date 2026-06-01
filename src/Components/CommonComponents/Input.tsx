interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
}: InputProps) {
  return (
    <input
      className={`input ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
