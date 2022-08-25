import React, { InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
}

export const Input = ({ label, ...inputProps }: InputProps) => (
  <label className="space-y-1">
    <span className="block text text-sm font-medium">{label}</span>
    <input
      className="w-full py-2 pl-3 pr-8 rounded-md dark:bg-black border-2 dark:border-gray-500 border-slate-200"
      {...inputProps}
    />
  </label>
);
