import clsx from 'clsx';

interface ColorfulStateProps {
  label: string;
  value: string | number | undefined;
  bgColor: string;
  textColor?: string;
}

export const ColorfulStat = ({
  label,
  value,
  bgColor,
  textColor = 'text-gray-100',
}: ColorfulStateProps) =>
  value ? (
    <div className={clsx('rounded-3xl p-6', bgColor, textColor)}>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-4xl">{value}</p>
    </div>
  ) : null;
