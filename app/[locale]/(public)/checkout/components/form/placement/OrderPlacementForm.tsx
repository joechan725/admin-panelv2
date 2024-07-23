import ErrorTranslation from '@/components/form/ErrorTranslation';
import AddressSelector from './address/AddressSelector';
import CouponsInput from './coupon/CouponsInput';
import DeliveryOptionSelector from './deliveryOption/DeliveryOptionSelector';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import LightBorder from '@/components/layout/container/LightBorder';
import { orderPlacementSchema, OrderPlacementSchema } from '@/schemas/order/orderPlacementSchema';
import TextInput from '@/components/form/TextInput';
import { useSessionStore } from '@/stores/useSessionStore';
import BarButton from '@/components/form/BarButton';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { useTranslations } from 'next-intl';

interface PlaceOrderParameters {
  formData: OrderPlacementSchema;
}

interface OrderPlacementFormProps {
  placeOrder: ({ formData }: PlaceOrderParameters) => Promise<void>;
  error?: string;
}

const OrderPlacementForm = ({ placeOrder, error }: OrderPlacementFormProps) => {
  const t = useTranslations('Order.placementForm');
  const { convertUserName } = useLanguage();

  const { user } = useSessionStore((state) => ({ user: state.user }));

  const userFullName = convertUserName({ firstName: user?.firstName, lastName: user?.lastName, fallbackName: '' });

  const {
    handleSubmit,
    control,
    clearErrors,
    setError,
    setValue,
    register,
    formState: { isSubmitting, errors },
  } = useForm<OrderPlacementSchema>({
    resolver: zodResolver(orderPlacementSchema),
    defaultValues: {
      couponCodes: [],
      isPickUp: false,
      contactName: userFullName,
      contactPhoneNumber: user?.phoneNumber,
    },
  });

  const { deliveryAddressId, deliveryOptionId, isPickUp } = useWatch({ control });

  const handlePlaceOrder: SubmitHandler<OrderPlacementSchema> = async (formData) => {
    await placeOrder({ formData });
  };

  const isPending = isSubmitting;

  return (
    <div className="space-y-8">
      <LightBorder>
        <DeliveryOptionSelector setValue={setValue} selectedDeliveryOptionId={deliveryOptionId} />
      </LightBorder>
      <LightBorder>
        <AddressSelector hidden={isPickUp} setValue={setValue} selectedAddressId={deliveryAddressId} />
        {isPickUp && <div className="font-semibold text-primary-text mb-2">{t('contactInformation')}</div>}
        <TextInput
          hidden={!isPickUp}
          disabled={isPending}
          register={register}
          registerName="contactName"
          title={t('contactName')}
          type="text"
        />
        <TextInput
          hidden={!isPickUp}
          disabled={isPending}
          register={register}
          registerName="contactPhoneNumber"
          title={t('contactPhoneNumber')}
          type="text"
        />
      </LightBorder>
      <LightBorder>
        <CouponsInput
          control={control}
          clearErrors={clearErrors}
          setError={setError}
          disabled={isSubmitting}
          errors={errors}
          registerName="couponCodes"
          title={t('couponCodes')}
          placeholder={t('couponCodesDescription')}
        />
      </LightBorder>
      <div className="space-y-2">
        <BarButton disabled={isSubmitting} type="button" theme="paypal" onClick={handleSubmit(handlePlaceOrder)}>
          {t('checkout')}
        </BarButton>
        <ErrorTranslation error={errors.root?.message} />
        <ErrorTranslation error={errors.deliveryRegion?.message} />
        <ErrorTranslation error={error} />
      </div>
    </div>
  );
};

export default OrderPlacementForm;
