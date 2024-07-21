import clsx from 'clsx/lite';

interface LoadingShimmerProps {
  className?: string;
  gradient: 'gray' | 'slate' | 'stone' | 'white';
  roundedClassName?: string;
}

const LoadingShimmer = ({ className, gradient = 'slate', roundedClassName }: LoadingShimmerProps) => {
  return (
    <div
      className={clsx(
        'absolute w-full h-full isolate overflow-hidden top-0 left-0',
        'before:w-full before:h-full before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:border-t before:bg-gradient-to-r before:from-transparent before:to-transparent',
        roundedClassName,
        gradient === 'gray' && 'before:border-gray-500/10 before:via-gray-500/10',
        gradient === 'slate' && 'before:border-slate-500/10 before:via-slate-500/10',
        gradient === 'stone' && 'before:border-stone-500/10 before:via-stone-500/10',
        gradient === 'white' && 'before:border-white/50 before:via-white/80',
        className
      )}
    />
  );
};

export default LoadingShimmer;
