import React, { InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
}

export const Input = ({ label, ...inputProps }: InputProps) => (
  <label className="space-y-1">
    <span className="text block text-sm font-medium">{label}</span>
    <input
      className="w-full rounded-md border-2 border-slate-200 py-2 pl-3 pr-8 dark:border-gray-500 dark:bg-black"
      {...inputProps}
    />
  </label>
);
