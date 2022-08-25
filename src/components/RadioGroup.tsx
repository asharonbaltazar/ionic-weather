import React from 'react';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { State } from '@components/State';

interface RadioGroupProps<Value> {
  label?: string;
  value: Value;
  options: { value: Value; label: string }[];
  onChange: (newValue: Value) => void;
}

export const RadioGroup = <Value extends unknown>({
  label,
  value: currentValue,
  options,
  onChange,
}: RadioGroupProps<Value>) => (
  <State state={currentValue}>
    {([stateValue, setStateValue]) => (
      <HeadlessRadioGroup value={stateValue} onChange={setStateValue}>
        {label && <HeadlessRadioGroup.Label>{label}</HeadlessRadioGroup.Label>}
        <ul className="space-y-1">
          {options.map(({ value, label }) => (
            <HeadlessRadioGroup.Option
              key={label}
              className="flex justify-between items-center"
              value={value}
              as="li"
            >
              {({ checked }) => (
                <label className="py-1 w-full md:text-sm font-medium text-gray-900 dark:text-stone-200 flex justify-between hover:cursor-pointer">
                  {label}
                  <input
                    type="radio"
                    className="w-4 h-4"
                    checked={checked}
                    readOnly
                  />
                </label>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </ul>

        <div className="flex justify-end items-center gap-x-2 mt-6">
          <button
            className="md:text-sm font-medium dark:hover:bg-slate-700 hover:bg-slate-300 rounded-lg px-5 py-2 dark:bg-slate-600"
            onClick={() => onChange(currentValue)}
          >
            Cancel
          </button>
          <button
            className="md:text-sm font-medium dark:hover:bg-slate-700 rounded-lg px-5 py-2 dark:bg-slate-600 bg-slate-200 hover:bg-slate-300"
            onClick={() => onChange(stateValue)}
          >
            Ok
          </button>
        </div>
      </HeadlessRadioGroup>
    )}
  </State>
);
