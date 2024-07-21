'use client';

import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import ErrorTranslation from './ErrorTranslation';
import clsx from 'clsx/lite';
import LoadingShimmer from '../loading/LoadingShimmer';

interface SelectInputProps<T extends FieldValues> {
  title?: string;
  disabled: boolean;
  blankOption?: boolean;
  selectOptions: {
    option?: string;
    value: string;
  }[];
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T> | undefined;
  noLoadingShimmer?: boolean;
}

const SelectInput = <T extends FieldValues>({
  title,
  blankOption = true,
  selectOptions,
  disabled = false,
  register,
  registerName,
  registerOptions,
  errors,
  noLoadingShimmer,
}: SelectInputProps<T>) => {
  const { name, onBlur, onChange, ref } = register(registerName, registerOptions);

  return (
    <div className="mb-4">
      {title && (
        <label
          htmlFor={registerName}
          className="text-sm text-slate-600 font-semibold block mb-2"
          id={title.toLowerCase()}
        >
          {title}
        </label>
      )}
      <div className="relative">
        {disabled && !noLoadingShimmer && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
        <select
          disabled={disabled}
          className={clsx(
            'relative flex gap-4 items-center px-4 w-full py-2 rounded-md border focus:border-gray-500 focus:ring-gray-500/50 focus:ring-1 focus:outline-none scrollbar scrollbar-slate',
            errors && errors[registerName] ? 'border-danger' : 'border-gray-300'
          )}
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
        >
          {selectOptions.length > 0 && (
            <>
              {blankOption && <option />}
              {selectOptions.map(({ option, value }) => (
                <option key={option ?? value} value={value}>
                  {option ?? value}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <ErrorTranslation error={errors?.[registerName]?.message?.toString()} />
    </div>
  );
};

export default SelectInput;
