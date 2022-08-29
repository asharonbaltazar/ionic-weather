import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  checked: boolean;
  onChange?: (newValue: boolean) => void;
}

export const Switch = ({ checked, onChange = () => {} }: SwitchProps) => (
  <HeadlessSwitch
    checked={checked}
    onChange={onChange}
    className={`${
      checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-zinc-400'
    } relative inline-flex h-6 w-11 items-center rounded-full`}
    as="span"
  >
    <span
      className={`${
        checked ? 'translate-x-6' : 'translate-x-1'
      } inline-block h-4 w-4 rounded-full bg-white`}
    />
  </HeadlessSwitch>
);
