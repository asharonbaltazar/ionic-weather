import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { State } from '@components/State';

interface RadioGroupProps<Value> {
  label?: string;
  value: Value;
  options: { value: Value; label: string }[];
  onChange: (newValue: Value) => void;
}

export const RadioGroup = <Value,>({
  label,
  value: currentValue,
  options,
  onChange,
}: RadioGroupProps<Value>) => (
  <State state={currentValue}>
    {([stateValue, setStateValue]) => (
      <HeadlessRadioGroup value={stateValue} onChange={setStateValue}>
        {label && <HeadlessRadioGroup.Label>{label}</HeadlessRadioGroup.Label>}
        <ul className="md:space-y-1">
          {options.map(({ value, label: optionLabel }) => (
            <HeadlessRadioGroup.Option
              key={optionLabel}
              className="flex items-center justify-between"
              value={value}
              as="li"
            >
              {({ checked }) => (
                <label className="text flex w-full justify-between py-1 font-medium hover:cursor-pointer md:text-sm">
                  {optionLabel}
                  <input
                    type="radio"
                    className="h-4 w-4"
                    checked={checked}
                    readOnly
                  />
                </label>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-end gap-x-2">
          <button
            className="rounded-lg px-5 py-2 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 md:text-sm"
            onClick={() => onChange(currentValue)}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-slate-200 px-5 py-2 font-medium hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 md:text-sm"
            onClick={() => onChange(stateValue)}
          >
            Ok
          </button>
        </div>
      </HeadlessRadioGroup>
    )}
  </State>
);
