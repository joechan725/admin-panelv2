import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BoxTick from './BoxTick';

interface BoxTickControllerProps<T extends FieldValues, TKey extends Path<T>> {
  disabled: boolean;
  title?: string;
  control: Control<T>;
  registerName: TKey;
}

const BoxTickController = <T extends FieldValues, TKey extends Path<T>>({
  control,
  disabled,
  registerName,
  title,
}: BoxTickControllerProps<T, TKey> & (T[TKey] extends boolean ? { registerName: TKey } : never)) => {
  const handleClick = (field: ControllerRenderProps<T, TKey>) => {
    const prevValue = field.value as boolean;
    field.onChange(!prevValue);
  };

  return (
    <Controller
      control={control}
      name={registerName}
      disabled={disabled}
      render={({ field }) => (
        <div role="button" className="group flex gap-1 items-center flex-wrap mb-4" onClick={() => handleClick(field)}>
          <BoxTick isSelected={field.value as boolean} size="sm" theme="primary" />
          {title !== undefined && (
            <div className="text-sm font-semibold text-primary-text transition-all group-hover:text-opacity-85 group-active:text-opacity-70">
              {title}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default BoxTickController;
