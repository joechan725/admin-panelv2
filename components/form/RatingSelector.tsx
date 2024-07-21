import clsx from 'clsx/lite';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import LoadingShimmer from '../loading/LoadingShimmer';
import StarSolid from '../icon/StarSolid';
import StarEmpty from '../icon/StarEmpty';
import { useState } from 'react';
import ErrorTranslation from './ErrorTranslation';

interface RatingSelectorProps<T extends FieldValues> {
  control: Control<T>;
  title?: string;
  description?: string;
  disabled: boolean;
  hidden?: boolean;
  registerName: Path<T>;
}

const RatingSelector = <T extends FieldValues>({
  control,
  title,
  description,
  disabled,
  hidden = false,
  registerName,
}: RatingSelectorProps<T>) => {
  const [hoverRating, setHoverRating] = useState<number | undefined>(undefined);

  const handleSelect = (rating: number, field: ControllerRenderProps<T, Path<T>>) => field.onChange(rating);

  const handleHover = (rating: number) => setHoverRating(rating);

  const handleLeave = () => setHoverRating(undefined);

  return (
    <Controller
      control={control}
      name={registerName}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx('mb-4', hidden && 'hidden')}>
          {title && (
            <label
              htmlFor={registerName}
              className="text-sm text-slate-600 font-semibold block mb-2"
              id={title.toLowerCase()}
            >
              {title}
            </label>
          )}
          <div className="relative flex items-center">
            {disabled && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                disabled={disabled}
                type="button"
                key={index}
                className="text-yellow-500/95 px-0.5"
                onClick={() => handleSelect(index + 1, field)}
                onMouseEnter={() => handleHover(index + 1)}
                onMouseLeave={() => handleLeave()}
              >
                {field.value >= index + 1 || (hoverRating && hoverRating >= index + 1) ? <StarSolid /> : <StarEmpty />}
              </button>
            ))}
          </div>
          {description && <div className="mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>}
          <ErrorTranslation error={error?.message} />
        </div>
      )}
    />
  );
};
export default RatingSelector;
