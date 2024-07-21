'use client';

import BarButton from '@/components/form/BarButton';
import OrDividerLine from '@/components/form/OrDividerLine';
import TextInput from '@/components/form/TextInput';
import Box from '@/components/icon/Box';
import QuestionMarkCircle from '@/components/icon/QuestionMarkCircle';
import { searchOrderSchema, SearchOrderSchema } from '@/schemas/order/searchOrderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, Link } from '@/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface SearchOrderFormProps {
  orderId?: string;
  queryCode?: string;
}

const SearchOrderForm = ({ orderId, queryCode }: SearchOrderFormProps) => {
  const t = useTranslations('Order.search');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchOrderSchema>({
    resolver: zodResolver(searchOrderSchema),
    defaultValues: {
      orderId,
      queryCode,
    },
  });

  const handleSearch: SubmitHandler<SearchOrderSchema> = (formData) => {
    const { orderId, queryCode } = formData;

    if (!queryCode || queryCode === '') {
      router.push(`/orders/${orderId}`);
      return;
    }

    router.push(`/orders/${orderId}?queryCode=${queryCode}`);
  };

  const isPending = isSubmitting;

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full">
      <div className="text-center text-xl font-semibold text-primary-text mb-4">{t('title')}</div>
      <div className="text-sm font-medium text-secondary-text mb-4">{t('description')}</div>
      <TextInput
        register={register}
        disabled={isPending}
        registerName="orderId"
        type="text"
        placeholder={t('orderId')}
        starting={<Box className="text-primary-text/80" sizeClassName="size-5" />}
        errors={errors}
      />
      <TextInput
        register={register}
        disabled={isPending}
        registerName="queryCode"
        type="text"
        placeholder={t('queryCode')}
        starting={<QuestionMarkCircle className="text-primary-text/80" sizeClassName="size-5" />}
        errors={errors}
      />
      <BarButton theme="primary" disabled={isPending} type="submit">
        {t('search')}
      </BarButton>
      <OrDividerLine>{t('or')}</OrDividerLine>
      <div className="font-medium text-sm text-secondary-text mb-4">
        <Link href="/my-account/orders" className="font-bold hover:opacity-70 active:opacity-40">
          {t('login')}
        </Link>
        {t('toViewYourOrders')}
      </div>
    </form>
  );
};

export default SearchOrderForm;
