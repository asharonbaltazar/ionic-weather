interface LabelAndValueProps {
  label: string;
  value?: string | number;
}

export const LabelAndValue = ({ label, value }: LabelAndValueProps) =>
  value ? (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  ) : null;
