'use client';

import clsx from 'clsx/lite';
import { motion } from 'framer-motion';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import ErrorTranslation from './ErrorTranslation';

interface ToggleSwitchControllerProps<T extends FieldValues, TKey extends Path<T>> {
  theme: 'success' | 'safe' | 'danger';
  disabled: boolean;
  control: Control<T>;
  registerName: TKey;
}
const ToggleSwitchController = <T extends FieldValues, TKey extends Path<T>>({
  theme,
  disabled,
  control,
  registerName,
}: ToggleSwitchControllerProps<T, TKey>) => {
  const handleToggle = (field: ControllerRenderProps<T, TKey>) => {
    if (disabled) {
      return;
    }
    const prevState = field.value as boolean;
    field.onChange(!prevState);
  };

  return (
    <Controller
      name={registerName}
      disabled={disabled}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isToggled = field.value as boolean;
        return (
          <>
            <motion.div
              className="relative w-10 h-5 rounded-full bg-gray-400 overflow-hidden"
              onClick={() => handleToggle(field)}
            >
              <motion.div
                className={clsx(
                  'absolute inset-0 w-full',
                  theme === 'success' && 'bg-success',
                  theme === 'danger' && 'bg-danger',
                  theme === 'safe' && 'bg-safe'
                )}
                initial={{ width: isToggled ? 'auto' : 0 }}
                animate={{ width: isToggled ? 'auto' : 0 }}
                transition={{ duration: 1.65, type: 'spring' }}
              />
              <motion.span
                className="absolute size-4 top-0.5 left-0.5 rounded-full transition-all duration-500 shadow-lg bg-white"
                initial={{ x: isToggled ? 20 : 0 }}
                animate={{ x: isToggled ? 20 : 0 }}
                transition={{ duration: 0.1, type: 'spring' }}
              />
            </motion.div>
            <ErrorTranslation error={error?.message} />
          </>
        );
      }}
    />
  );
};

export default ToggleSwitchController;
