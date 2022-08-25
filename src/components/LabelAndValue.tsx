import React from 'react';

interface LabelAndValueProps {
  label: string;
  value?: string | number;
}

export const LabelAndValue = ({ label, value }: LabelAndValueProps) =>
  value ? (
    <div className="flex items-center justify-between">
      <span>{label}: </span>
      <span>{value}</span>
    </div>
  ) : null;
