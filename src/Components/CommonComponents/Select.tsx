import { ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  value,
  onChange,
  children,
  className = "",
  disabled = false,
}: SelectProps) {
  return (
    <select
      className={`select ${className}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {children}
    </select>
  );
}
