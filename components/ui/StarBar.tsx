import StarEmpty from '../icon/StarEmpty';
import StarSolid from '../icon/StarSolid';

interface StarBarProps {
  totalStars?: number;
  activeStar: number;
  sizeClassName?: string;
  className?: string;
}

const StarBar = ({
  totalStars = 5,
  activeStar,
  sizeClassName = 'size-5',
  className = 'text-yellow-500/95',
}: StarBarProps) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: totalStars }).map((_, index) => {
        const activeState = activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        const halfStarWidth = (activeState % 1) * 100;

        return (
          <div className="relative" key={index}>
            <div
              style={{
                width: showRatingWithPrecision ? `${halfStarWidth}%` : '0%',
                overflow: 'hidden',
                position: 'absolute',
              }}
            >
              <StarSolid sizeClassName={sizeClassName} className={className} />
            </div>
            <div>
              {showEmptyIcon ? (
                <StarEmpty sizeClassName={sizeClassName} className={className} />
              ) : (
                <StarSolid sizeClassName={sizeClassName} className={className} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarBar;
