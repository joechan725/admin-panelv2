'use client';

import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx/lite';
import ErrorTranslation from './ErrorTranslation';
import LoadingShimmer from '../loading/LoadingShimmer';

interface TextInputProps<T extends FieldValues> {
  hidden?: boolean;
  type: 'email' | 'number' | 'password' | 'text' | 'url';
  disabled: boolean;
  title?: string;
  description?: string;
  starting?: React.ReactNode;
  ending?: React.ReactNode;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T> | undefined;
  noLoadingShimmer?: boolean;
  placeholder?: string;
}

// use react-hook-form with an input component:
// https://stackoverflow.com/questions/76803987/what-type-to-use-for-register-from-the-react-hook-form-register-typescript-type/77636341#77636341

const TextInput = <T extends FieldValues>({
  hidden,
  type,
  title,
  description,
  starting,
  ending,
  register,
  registerName,
  registerOptions,
  errors,
  disabled,
  noLoadingShimmer = false,
  placeholder,
}: TextInputProps<T>) => {
  const { name, onBlur, onChange, ref } = register(registerName, registerOptions);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number' && (event.key === 'e' || event.key === 'E')) {
      event.preventDefault();
    }
  };
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === 'number') {
      (event.target as HTMLElement).blur();
    }
  };

  return (
    <div className={clsx('mb-4', hidden && 'hidden')}>
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
          'relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
          errors && errors[registerName] ? 'border-danger' : 'border-gray-300'
        )}
      >
        {disabled && !noLoadingShimmer && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
        {starting !== undefined && <div className="text-primary-text/80">{starting}</div>}
        <input
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          type={type}
          disabled={disabled}
          className={clsx(
            'w-full focus:outline-none flex-1 font-medium text-primary-text disabled:bg-transparent disabled:text-opacity-60',
            type === 'number' && 'number-input-no-scroll'
          )}
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
        />
        {ending}
      </div>
      {description !== undefined && (
        <div className="block mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>
      )}
      <ErrorTranslation error={errors?.[registerName]?.message?.toString()} />
    </div>
  );
};

export default TextInput;
