import Edit from '@/components/icon/Edit';
import { SmartBar as SmartBarModel } from '@/models/smartBar/SmartBar';
import { Link } from '@/navigation';
import SmartBarTogglePublic from './SmartBarTogglePublic';
import SmartBarDeleteButton from './SmartBarDeleteButton';
import SmartBar from '@/components/layout/smartBar/SmartBar';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { SmartBarIdAndIsPublic } from '@/lib/hooks/smartBar/useSmartBar';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/helpers/date/formatDate';

interface SmartBarItemProps {
  smartBar: SmartBarModel;
  isSelect?: boolean;
  onSelect?: ({}: SmartBarIdAndIsPublic) => void;
}

const SmartBarItem = ({ smartBar, isSelect, onSelect }: SmartBarItemProps) => {
  const t = useTranslations('SmartBar.list');

  const { id, isPublic, createdAt, updatedAt } = smartBar;

  return (
    <TrBody>
      {onSelect && (
        <Td>
          <input
            type="checkbox"
            checked={isSelect}
            onClick={() => (onSelect ? onSelect({ smartBarId: id, originalIsPublic: isPublic }) : null)}
            className="size-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring"
          />
        </Td>
      )}

      {/* preview */}
      <Td>
        <div className="min-w-96">
          <SmartBar smartBar={smartBar} />
        </div>
      </Td>

      {/* time */}
      <Td>
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
      </Td>

      {/* published? */}
      <Td>
        <SmartBarTogglePublic smartBar={smartBar} key={crypto.randomUUID()} />
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message="Edit">
            <IconButton disabled={false} theme="secondary" type="button">
              <Link href={`/admin/smart-bars/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <SmartBarDeleteButton smartBar={smartBar} />
        </div>
      </Td>
    </TrBody>
  );
};

export default SmartBarItem;
