import ErrorTranslation from '@/components/form/ErrorTranslation';
import { removeExtraSpaces } from '@/lib/helpers/string/removeExtraSpaces';
import clsx from 'clsx/lite';
import { useState } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';

interface CouponsInputProps<T extends FieldValues, TKey extends Path<T>> {
  disabled: boolean;
  control: Control<T>;
  registerName: TKey;
  errors: FieldErrors<T> | undefined;
  title: string;
  placeholder?: string;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
}

const CouponsInput = <T extends FieldValues, TKey extends Path<T>>({
  disabled,
  control,
  registerName,
  errors,
  title,
  placeholder,
  setError,
  clearErrors,
}: CouponsInputProps<T, TKey> & (T[TKey] extends string[] ? { registerName: TKey } : never)) => {
  const [isEditingCoupon, setIsEditingCoupon] = useState<string | null>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    mode: 'add' | 'update',
    originalCoupon?: string
  ) => {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault();
      if (mode === 'add') {
        handleAddCoupons(event, field);
      }
      if (mode === 'update' && originalCoupon) {
        handleUpdateCoupons(event, field, originalCoupon);
        setIsEditingCoupon(null);
      }
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    mode: 'add' | 'update',
    originalCoupon?: string
  ) => {
    if (mode === 'add') {
      handleAddCoupons(event, field);
    }
    if (mode === 'update' && originalCoupon) {
      handleUpdateCoupons(event, field, originalCoupon);
      setIsEditingCoupon(null);
    }
  };

  const handleAddCoupons = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>
  ) => {
    const target = event.target as HTMLInputElement;
    const newCoupon = removeExtraSpaces(target.value.trim());
    if (newCoupon.length > 0 && newCoupon.length < 4) {
      setError(registerName, { message: 'Each code must be at least 4 characters long' });
      return;
    }
    if (!newCoupon) {
      return;
    }
    const previousCoupons = field.value as string[];
    if (previousCoupons.includes(newCoupon)) {
      setError(registerName, { message: `The coupon "${newCoupon}" has already been added.` });
      return;
    }
    const newCoupons = [...previousCoupons, newCoupon];
    field.onChange(newCoupons);
    target.value = '';
  };

  const handleUpdateCoupons = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    originalCoupon: string
  ) => {
    const target = event.target as HTMLInputElement;
    const updateCoupon = removeExtraSpaces(target.value.trim());
    if (updateCoupon.length > 0 && updateCoupon.length < 4) {
      setError(registerName, { message: 'Each code must be at least 4 characters long' });
      return;
    }
    if (updateCoupon !== originalCoupon) {
      const previousCoupons = field.value as string[];
      if (previousCoupons.includes(updateCoupon)) {
        setError(registerName, { message: `The coupon "${updateCoupon}" has already been added.` });
        return;
      }
      const newCoupons: string[] = [];
      previousCoupons.forEach((previousCoupon) => {
        if (previousCoupon === originalCoupon && updateCoupon) {
          newCoupons.push(updateCoupon);
        }
        if (previousCoupon !== originalCoupon) {
          newCoupons.push(previousCoupon);
        }
      });
      field.onChange(newCoupons);
    }
    target.value = '';
  };

  const handleDeleteCoupon = (targetCoupon: string, field: ControllerRenderProps<T, TKey>) => {
    const newCoupons = (field.value as string[]).filter((coupon) => coupon !== targetCoupon);
    field.onChange(newCoupons);
  };
  return (
    <Controller
      name={registerName}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <div className="font-semibold text-primary-text">{title}</div>
          {(field.value as string[]).map((coupon) => (
            <div key={coupon}>
              {isEditingCoupon !== coupon && (
                <div className="flex justify-between gap-2">
                  <div
                    role="button"
                    className="px-4 flex-1 text-sm font-medium text-primary-text hover:text-opacity-85 active:text-opacity-70"
                    onClick={() => setIsEditingCoupon(coupon)}
                  >
                    {coupon}
                  </div>
                  <div
                    role="button"
                    onClick={() => handleDeleteCoupon(coupon, field)}
                    className="text-danger hover:text-opacity-85 active:text-opacity-70"
                  >
                    &times;
                  </div>
                </div>
              )}
              {isEditingCoupon === coupon && (
                <div
                  className={clsx(
                    'relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
                    errors && errors[registerName] ? 'border-danger' : 'border-gray-300'
                  )}
                >
                  <input
                    type="text"
                    disabled={disabled}
                    onBlur={(e) => handleBlur(e, field, 'update', coupon)}
                    onKeyDown={(e) => handleKeyDown(e, field, 'update', coupon)}
                    onChange={(e) => clearErrors(registerName)}
                    className={clsx(
                      'focus:outline-none flex-1 text-primary-text w-full max-w-full disabled:bg-transparent text-sm',
                      disabled && 'text-opacity-60'
                    )}
                    defaultValue={coupon}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ))}

          <div
            className={clsx(
              'relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
              errors && errors[registerName] ? 'border-danger' : 'border-gray-300'
            )}
          >
            <input
              type="text"
              disabled={disabled}
              onBlur={(e) => handleBlur(e, field, 'add')}
              onKeyDown={(e) => handleKeyDown(e, field, 'add')}
              onChange={(e) => clearErrors(registerName)}
              className={clsx(
                'focus:outline-none flex-1 font-medium text-primary-text w-full max-w-full disabled:bg-transparent text-sm',
                disabled && 'text-opacity-60'
              )}
              placeholder={placeholder}
            />
          </div>
          <ErrorTranslation error={errors?.[registerName]?.message?.toString()} />
        </div>
      )}
    />
  );
};

export default CouponsInput;
