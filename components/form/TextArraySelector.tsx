'use client';

import { Control, Controller, ControllerRenderProps, FieldValues, Path, PathValue, useWatch } from 'react-hook-form';
import clsx from 'clsx/lite';
import { AnimatePresence, motion } from 'framer-motion';

interface TextArraySelectorProps<T extends FieldValues, TKey extends Path<T>> {
  hidden?: boolean;
  availableTexts: string[];
  disabled: boolean;
  title?: string;
  description?: string;
  defaultValue?: PathValue<T, TKey>;
  control: Control<T>;
  registerName: TKey;
}

const TextArraySelector = <T extends FieldValues, TKey extends Path<T>>({
  hidden,
  availableTexts,
  disabled,
  title,
  description,
  defaultValue,
  control,
  registerName,
}: TextArraySelectorProps<T, TKey> & (T[TKey] extends string[] ? { registerName: TKey } : never)) => {
  const watch = useWatch({ control });
  const selectedTexts = (watch[registerName] ?? []) as string[];

  const displayTexts = availableTexts.filter(
    (availableText) => !selectedTexts.some((selectedText) => selectedText === availableText)
  );

  const handleSelect = (newText: string, field: ControllerRenderProps<T, TKey>) => {
    const previousTexts = field.value as string[];
    const newTexts = [...previousTexts, newText];
    field.onChange(newTexts);
  };

  return (
    <Controller
      name={registerName}
      disabled={disabled}
      control={control}
      defaultValue={defaultValue ?? ([] as PathValue<T, TKey>)}
      render={({ field }) => (
        <div className={clsx('mb-2', hidden && 'hidden')}>
          {title && <div className="mb-2 text-sm text-slate-600 font-semibold">{title}</div>}

          <div className="flex flex-wrap gap-1 items-center overflow-x-hidden max-w-full w-full">
            <AnimatePresence>
              {displayTexts &&
                displayTexts.length > 0 &&
                displayTexts.map((text) => (
                  <motion.div key={text} exit={{ scale: 0 }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <button
                      className={clsx(
                        'flex items-center bg-primary-bg hover:bg-opacity-85 active:bg-opacity-70 text-white rounded text-sm px-2 py-0.5',
                        disabled && 'bg-opacity-70'
                      )}
                      onClick={() => handleSelect(text, field)}
                    >
                      {text}
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          {(!displayTexts || displayTexts.length === 0) && (
            <div className="mb-2 text-sm mt-0.5 font-medium text-tertiary-text">No available tags</div>
          )}
          {description && <div className="mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>}
        </div>
      )}
    />
  );
};

export default TextArraySelector;
