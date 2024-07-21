import { Promotion } from '@/models/promotion/Promotion';
import { formatDate } from '@/lib/helpers/date/formatDate';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { useRouter } from '@/navigation';
import { getPlainTextFromHtml } from '@/lib/helpers/html/getPlainTextFromHtml';
import { useTranslations } from 'next-intl';

interface PromotionItemProps {
  promotion: Promotion;
}

const PromotionItem = ({ promotion }: PromotionItemProps) => {
  const t = useTranslations('Promotion.list');

  const router = useRouter();
  const { id, html, subject, promoteByEmail, promoteByNotification, text, to, cc, bcc, createdAt } = promotion;

  // Join the receivers
  const toString = to?.join(', ') ?? '';
  const ccString = cc?.join(', ') ?? '';
  const bccString = bcc?.join(', ') ?? '';
  const receiversString = toString + ccString + bccString;

  // Convert the content html to inline text
  const plainHtml = getPlainTextFromHtml(html);
  const content = [text, plainHtml].join(' ');

  return (
    <TrBody onClick={() => router.push(`/admin/promotions/${id}`)}>
      {/* Promotion Type */}
      <Td>
        <div className="flex gap-2 flex-wrap">
          {promoteByNotification && (
            <div className="text-xs py-0.5 px-1 rounded-md max-w-min font-medium bg-success/20 text-success">
              {t('notification')}
            </div>
          )}
          {promoteByEmail && (
            <div className="text-xs py-0.5 px-1 rounded-md max-w-min font-medium bg-safe/20 text-safe">
              {t('email')}
            </div>
          )}
        </div>
      </Td>

      {/* Receivers */}
      <Td>
        <div className="w-full maw-w-16 sm:max-w-24 md:max-w-52 line-clamp-1 text-ellipsis">
          <div className="text-sm font-medium text-secondary-text">{receiversString}</div>
        </div>
      </Td>

      {/* Subject & Content */}
      <Td>
        <div className="max-w-screen-md w-full line-clamp-1 text-ellipsis">
          <span className="text-sm font-medium text-primary-text">{subject} </span>
          {content !== '' && <span className="text-sm font-medium text-tertiary-text"> - </span>}
          {content !== '' && <span className="text-sm font-medium text-tertiary-text">{content}</span>}
        </div>
      </Td>

      {/* Time */}
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-primary-text">
            {createdAt ? formatDate(createdAt, 'detail') : 'N/A'}
          </div>
        </div>
      </Td>
    </TrBody>
  );
};

export default PromotionItem;
