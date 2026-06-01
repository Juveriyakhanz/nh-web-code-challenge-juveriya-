import { ReactNode } from "react";

interface FormGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export default function FormGroup({
  label,
  children,
  className = "",
}: FormGroupProps) {
  return (
    <div className={`form-group ${className}`}>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
