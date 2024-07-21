import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import ErrorTranslation from './ErrorTranslation';

interface DateInputProps<T extends FieldValues> {
  disabled: boolean;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  title?: string;
  description?: string;
  errors?: FieldErrors | undefined;
  type?: 'datetime-local' | 'date';
  placeholder?: string;
}

const DateInput = <T extends FieldValues>({
  disabled,
  register,
  registerName,
  registerOptions,
  title,
  description,
  errors,
  type = 'datetime-local',
  placeholder,
}: DateInputProps<T>) => {
  const { name, onBlur, onChange, ref } = register(registerName, registerOptions);

  return (
    <div className="mb-4">
      {title && <div className="mb-2 text-sm text-slate-600 font-semibold">{title}</div>}
      <input
        type={type}
        disabled={disabled}
        className="max-w-full px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1"
        ref={ref}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
      {description && <div className="block mb-2 text-xs mt-1 text-gray-500">{description}</div>}
      {errors && <ErrorTranslation error={errors[registerName]?.message?.toString()} />}
    </div>
  );
};

export default DateInput;
