import { PrivateCollection } from '@/models/classification/collection/PrivateCollection';
import CollectionDeleteButton from './CollectionDeleteButton';
import Edit from '@/components/icon/Edit';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import { formatDate } from '@/lib/helpers/date/formatDate';
import IconButton from '@/components/ui/button/IconButton';
import { useLocale, useTranslations } from 'next-intl';

interface CollectionItemProps {
  privateCollection: PrivateCollection;
  onSelect?: (id: string) => void;
  isSelect?: boolean;
}

const CollectionItem = ({ privateCollection, isSelect, onSelect }: CollectionItemProps) => {
  const t = useTranslations('Category.list');
  const locale = useLocale();

  const {
    id,
    nameZH,
    nameEN,
    totalProductCount,
    privateProductCount,
    publicProductCount,
    sales,
    revenue,
    createdAt,
    updatedAt,
  } = privateCollection;

  const name = locale === 'en' ? nameEN : nameZH;

  return (
    <tr className="border-b border-slate-900/10 even:bg-gray-50/50">
      {onSelect && (
        <td className="p-2">
          <input
            type="checkbox"
            checked={isSelect}
            onClick={() => onSelect(id)}
            className="size-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring"
          />
        </td>
      )}

      {/* name */}
      <td className="p-2">
        <div className="max-w-80 truncate text-sm font-semibold text-primary-text">{name}</div>
      </td>

      {/* totalProductCount */}
      <td className="p-2">
        <div className="text-sm font-semibold text-primary-text">{totalProductCount ?? 0}</div>
      </td>

      {/* publicProductCount */}
      <td className="p-2">
        <div className="text-sm font-semibold text-primary-text">{publicProductCount ?? 0}</div>
      </td>

      {/* privateProductCount */}
      <td className="p-2">
        <div className="text-sm font-semibold text-primary-text">{privateProductCount ?? 0}</div>
      </td>

      {/* revenue */}
      <td className="p-2">
        <div className="text-sm font-semibold text-primary-text">${(revenue ? revenue : 0).toFixed(1)}</div>
      </td>

      {/* sales */}
      <td className="p-2">
        <div className="text-sm font-semibold text-primary-text">{sales ?? 0}</div>
      </td>

      {/* time */}
      <td className="p-2">
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('updatedAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {updatedAt ? formatDate(updatedAt, 'short') : 'N/A'}
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('createdAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {createdAt ? formatDate(createdAt, 'short') : 'N/A'}
          </div>
        </div>
      </td>

      {/* actions */}
      <td className="p-2">
        <div className="flex items-center gap-2">
          <HoverPopup message={t('edit')}>
            <IconButton disabled={false} type="button" theme="secondary">
              <Link href={`/admin/categories/collections/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <CollectionDeleteButton privateCollection={privateCollection} />
        </div>
      </td>
    </tr>
  );
};
export default CollectionItem;
