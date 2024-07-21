'use client';

import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx/lite';
import LoadingShimmer from '../loading/LoadingShimmer';

interface ColorInputProps<T extends FieldValues> {
  sizeClassName?: string;
  disabled: boolean;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

// use react-hook-form with an input component:
// https://stackoverflow.com/questions/76803987/what-type-to-use-for-register-from-the-react-hook-form-register-typescript-type/77636341#77636341

const ColorInput = <T extends FieldValues>({
  sizeClassName = 'size-6',
  register,
  registerName,
  registerOptions,
  disabled,
}: ColorInputProps<T>) => {
  const { name, onBlur, onChange, ref } = register(registerName, registerOptions);

  return (
    <label htmlFor={registerName.toLocaleLowerCase()} className="inline-block">
      <div
        className={clsx(
          sizeClassName,
          'relative overflow-hidden rounded-full border border-gray-500/50 has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1'
        )}
      >
        {disabled && <LoadingShimmer gradient="white" roundedClassName="rounded-full" />}
        <input
          id={registerName.toLocaleLowerCase()}
          type="color"
          className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] size-16"
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </label>
  );
};

export default ColorInput;
