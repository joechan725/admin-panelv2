import { removeAllSearchParams } from '@/lib/helpers/searchParam/removeAllSearchParams';
import { removeSearchParams } from '@/lib/helpers/searchParam/removeSearchParams';
import { setSearchParams } from '@/lib/helpers/searchParam/setSearchParams';
import { toggleSearchParams } from '@/lib/helpers/searchParam/toggleSearchParams';
import { usePathname, useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

interface LoadRemoveSearchParamsParameter {
  key: string;
  scroll?: boolean;
}

interface LoadSetSearchParamsParameter {
  key: string;
  value: string | number;
  scroll?: boolean;
}

interface LoadToggleSearchParamsParameter {
  key: string;
  value: string | number;
  scroll?: boolean;
}

export const useSearching = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const loadRemoveAllSearchParams = (scroll?: boolean) => {
    removeAllSearchParams({
      originalPath: path,
      router,
      scroll,
    });
  };

  const loadRemoveSearchParams = ({ key, scroll }: LoadRemoveSearchParamsParameter) => {
    removeSearchParams({
      key: key.trim(),
      originalPath: path,
      originalSearchParams: searchParams,
      router,
      scroll,
    });
  };

  const loadSetSearchParams = ({ key, value, scroll }: LoadSetSearchParamsParameter) => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    setSearchParams({
      key: key.trim(),
      value: value.trim(),
      originalPath: path,
      originalSearchParams: searchParams,
      router,
      scroll,
    });
  };

  const loadToggleSearchParams = ({ key, value, scroll }: LoadToggleSearchParamsParameter) => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    toggleSearchParams({
      key: key.trim(),
      value: value.trim(),
      originalPath: path,
      originalSearchParams: searchParams,
      router,
      scroll,
    });
  };

  return {
    searchParams,
    path,
    router,
    loadRemoveAllSearchParams,
    loadRemoveSearchParams,
    loadSetSearchParams,
    loadToggleSearchParams,
  };
};
