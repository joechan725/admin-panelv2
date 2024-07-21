'use client';

import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx/lite';
import ErrorTranslation from './ErrorTranslation';
import LoadingShimmer from '../loading/LoadingShimmer';

interface TextareaInputProps<T extends FieldValues> {
  rows: number;
  disabled: boolean;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T> | undefined;
  ending?: React.ReactNode;
  placeholder?: string;
}

// use react-hook-form with an input component:
// https://stackoverflow.com/questions/76803987/what-type-to-use-for-register-from-the-react-hook-form-register-typescript-type/77636341#77636341

const TextareaInput = <T extends FieldValues>({
  rows,
  title,
  description,
  icon,
  register,
  registerName,
  registerOptions,
  errors,
  ending,
  disabled,
  placeholder,
}: TextareaInputProps<T>) => {
  const { name, onBlur, onChange, ref } = register(registerName, registerOptions);

  return (
    <div className="mb-4">
      {title && (
        <label
          htmlFor={registerName}
          className="text-sm font-semibold text-primary-text block mb-2"
          id={title.toLowerCase()}
        >
          {title}
        </label>
      )}
      <div
        className={clsx(
          'relative max-w-full flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
          errors && errors[registerName] ? 'border-danger' : 'border-gray-300'
        )}
      >
        {disabled && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
        {icon}
        <textarea
          rows={rows}
          disabled={disabled}
          className="w-full focus:outline-none font-medium text-primary-text disabled:bg-transparent resize-none disabled:text-opacity-60"
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
        />
        <div className="absolute right-4 bottom-4">{ending}</div>
      </div>
      {description && <div className="mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>}
      <ErrorTranslation error={errors?.[registerName]?.message?.toString()} />
    </div>
  );
};

export default TextareaInput;
