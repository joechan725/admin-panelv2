'use client';

import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import ErrorTranslation from './ErrorTranslation';
import clsx from 'clsx/lite';
import LoadingShimmer from '../loading/LoadingShimmer';
import { useState } from 'react';
import { removeExtraSpaces } from '@/lib/helpers/string/removeExtraSpaces';
import { AnimatePresence, motion } from 'framer-motion';

interface TextArrayInputProps<T extends FieldValues, TKey extends Path<T>> {
  hidden?: boolean;
  disabled: boolean;
  title?: string;
  description?: string;
  defaultValue?: PathValue<T, TKey>;
  control: Control<T>;
  registerName: TKey;
  type?: 'text' | 'email';
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
}

const TextArrayInput = <T extends FieldValues, TKey extends Path<T>>({
  hidden,
  disabled,
  title,
  description,
  defaultValue,
  control,
  registerName,
  type = 'text',
  setError,
  clearErrors,
}: TextArrayInputProps<T, TKey> & (T[TKey] extends string[] ? { registerName: TKey } : never)) => {
  const [isEditingTag, setIsEditingTag] = useState<string | null>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    mode: 'add' | 'update',
    originalTag?: string
  ) => {
    if (['Enter', 'Tab', ','].includes(event.key)) {
      event.preventDefault();
      if (mode === 'add') {
        handleAddTags(event, field);
      }
      if (mode === 'update' && originalTag) {
        handleUpdateTags(event, field, originalTag);
        setIsEditingTag(null);
      }
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    mode: 'add' | 'update',
    originalTag?: string
  ) => {
    if (mode === 'add') {
      handleAddTags(event, field);
    }
    if (mode === 'update' && originalTag) {
      handleUpdateTags(event, field, originalTag);
      setIsEditingTag(null);
    }
  };

  const handleAddTags = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>
  ) => {
    const target = event.target as HTMLInputElement;
    const newTag = removeExtraSpaces(target.value);
    if (!newTag) {
      return;
    }
    if (type === 'email' && !newTag.includes('@')) {
      setError(registerName, { message: `"${newTag}" is not a valid email.` });
      return;
    }

    const previousTags = field.value as string[];
    if (previousTags.includes(newTag)) {
      setError(registerName, { message: `"${newTag}" has already been added.` });
      return;
    }
    const newTags = [...previousTags, newTag];
    field.onChange(newTags);
    target.value = '';
  };

  const handleUpdateTags = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, TKey>,
    originalTag: string
  ) => {
    const target = event.target as HTMLInputElement;
    const updateTag = removeExtraSpaces(target.value.trim());
    if (updateTag !== originalTag) {
      const previousTags = field.value as string[];
      if (previousTags.includes(updateTag)) {
        setError(registerName, { message: `"${updateTag}" has already been added.` });
        return;
      }
      if (type === 'email' && !updateTag.includes('@')) {
        setError(registerName, { message: `"${updateTag}" is not a valid email.` });
        return;
      }
      const newTags: string[] = [];
      previousTags.forEach((previousTag) => {
        if (previousTag === originalTag && updateTag) {
          newTags.push(updateTag);
        }
        if (previousTag !== originalTag) {
          newTags.push(previousTag);
        }
      });
      field.onChange(newTags);
    }
    target.value = '';
  };

  const handleDeleteTag = (targetTag: string, field: ControllerRenderProps<T, TKey>) => {
    const newTags = (field.value as string[]).filter((tag) => tag !== targetTag);
    field.onChange(newTags);
  };

  return (
    <Controller
      name={registerName}
      disabled={disabled}
      control={control}
      defaultValue={defaultValue ?? ([] as PathValue<T, TKey>)}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx('mb-4', hidden && 'hidden')}>
          {title !== undefined && (
            <label
              htmlFor={registerName}
              className="text-sm text-primary-text font-semibold block mb-2"
              id={title.toLowerCase()}
            >
              {title}
            </label>
          )}
          <div
            className={clsx(
              'relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
              error ? 'border-danger' : 'border-gray-300'
            )}
          >
            {disabled && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
            <div className="flex flex-wrap gap-1 items-center overflow-x-hidden max-w-full w-full">
              <AnimatePresence>
                {(field.value as string[]).map((tag) => (
                  <div key={tag}>
                    {isEditingTag === tag && (
                      <input
                        type={type}
                        disabled={disabled}
                        autoFocus
                        className={clsx(
                          'focus:outline-none flex-1 text-primary-text disabled:bg-transparent',
                          disabled && 'text-opacity-60'
                        )}
                        defaultValue={tag}
                        onKeyDown={(e) => handleKeyDown(e, field, 'update', tag)}
                        onBlur={(e) => handleBlur(e, field, 'update', tag)}
                        onChange={(e) => clearErrors(registerName)}
                      />
                    )}
                    {isEditingTag !== tag && (
                      <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={clsx(
                          'flex items-center bg-primary-bg hover:bg-opacity-85 active:bg-opacity-70 text-white rounded text-sm',
                          disabled && 'bg-opacity-70'
                        )}
                      >
                        <div role="button" className="px-2 py-0.5" onClick={() => setIsEditingTag(tag)}>
                          {tag}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTag(tag, field)}
                          className="mr-2 hover:text-opacity-75 active:text-opacity-50"
                        >
                          &times;
                        </button>
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
              <input
                type={type}
                disabled={disabled}
                onKeyDown={(e) => handleKeyDown(e, field, 'add')}
                onBlur={(e) => handleBlur(e, field, 'add')}
                onChange={(e) => clearErrors(registerName)}
                className={clsx(
                  'focus:outline-none flex-1 text-primary-text w-full max-w-full disabled:bg-transparent',
                  disabled && 'text-opacity-60'
                )}
              />
            </div>
          </div>
          {description !== undefined && (
            <div className="mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>
          )}
          <ErrorTranslation error={error?.message} />
        </div>
      )}
    />
  );
};

export default TextArrayInput;
