import { orderInformationSchema, OrderInformationSchema } from '@/schemas/order/orderInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import DeliveryOptionSelector from './deliveryOption/DeliveryOptionSelector';
import TextInput from '@/components/form/TextInput';
import { Order } from '@/models/order/Order';
import SelectInput from '@/components/form/SelectInput';
import { useOrder } from '@/lib/hooks/order/useOrder';
import BoxButton from '@/components/form/BoxButton';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface EditOrderInformationForm {
  order: Order;
  onSuccess?: () => void;
}

const EditOrderInformationForm = ({ order, onSuccess }: EditOrderInformationForm) => {
  const t = useTranslations('Order.editInformationForm');
  const { convertRegion, convertDistrict } = useLanguage();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { isSubmitting, errors },
  } = useForm<OrderInformationSchema>({
    resolver: zodResolver(orderInformationSchema),
    defaultValues: {
      isPickUp: order.isPickUp,
      contactName: order.contactName,
      contactPhoneNumber: order.contactPhoneNumber,
      deliveryDetailAddress: order.deliveryDetailAddress,
      addressRemark: order.addressRemark,
      deliveryAddressId: order.deliveryAddressId,
      deliveryDistrict: order.deliveryDistrict as OrderInformationSchema['deliveryDistrict'],
      deliveryOptionDeliveryCharge: order.deliveryOptionDeliveryCharge,
      deliveryRegion: order.deliveryRegion as OrderInformationSchema['deliveryRegion'],
      deliveryOptionDeliveryProviderZH: order.deliveryOptionDeliveryProviderZH,
      deliveryOptionDeliveryProviderEN: order.deliveryOptionDeliveryProviderEN,
      deliveryOptionDescriptionZH: order.deliveryOptionDescriptionZH,
      deliveryOptionEstimatedTimeEN: order.deliveryOptionEstimatedTimeEN,
      deliveryOptionEstimatedTimeZH: order.deliveryOptionEstimatedTimeZH,
      deliveryOptionFreeDeliveryThreshold: order.deliveryOptionFreeDeliveryThreshold,
      deliveryOptionId: order.deliveryAddressId,
      deliveryOptionNameZH: order.deliveryOptionNameZH,
      deliveryOptionNameEN: order.deliveryOptionNameEN,
      storeName: order.storeName,
      storePhoneNumber: order.storePhoneNumber,
      storeBusinessHours: order.storeBusinessHours,
    },
  });

  const { error, isWriting, updateOrderInformation } = useOrder();

  const { deliveryOptionId, isPickUp, deliveryRegion } = useWatch({ control });

  const handleUpdateOrderInformation: SubmitHandler<OrderInformationSchema> = async (formData) => {
    const res = await updateOrderInformation({ orderId: order.id, formData });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  const isPending = isSubmitting || isWriting;

  const regionSelectOptions = [
    { value: 'Hong Kong Island', option: convertRegion('Hong Kong Island') },
    { value: 'Kowloon', option: convertRegion('Kowloon') },
    { value: 'New Territories', option: convertRegion('New Territories') },
  ];

  const isHongKongIsland = deliveryRegion === 'Hong Kong Island';
  const isKowloon = deliveryRegion === 'Kowloon';
  const isNewTerritories = deliveryRegion === 'New Territories';

  const districtSelectOptions = isHongKongIsland
    ? [
        { value: 'Central and Western District', option: convertDistrict('Central and Western District') },
        { value: 'Eastern District', option: convertDistrict('Eastern District') },
        { value: 'Southern District', option: convertDistrict('Southern District') },
        { value: 'Wan Chai District', option: convertDistrict('Wan Chai District') },
      ]
    : isKowloon
    ? [
        { value: 'Kowloon City District', option: convertDistrict('Kowloon City District') },
        { value: 'Kwun Tong District', option: convertDistrict('Kwun Tong District') },
        { value: 'Sham Shui Po District', option: convertDistrict('Sham Shui Po District') },
        { value: 'Wong Tai Sin District', option: convertDistrict('Wong Tai Sin District') },
        { value: 'Yau Tsim Mong District', option: convertDistrict('Yau Tsim Mong District') },
      ]
    : isNewTerritories
    ? [
        { value: 'Islands District', option: convertDistrict('Islands District') },
        { value: 'Kwai Tsing District', option: convertDistrict('Kwai Tsing District') },
        { value: 'North District', option: convertDistrict('North District') },
        { value: 'Sai Kung District', option: convertDistrict('Sai Kung District') },
        { value: 'Sha Tin District', option: convertDistrict('Sha Tin District') },
        { value: 'Tai Po District', option: convertDistrict('Tai Po District') },
        { value: 'Tsuen Wan District', option: convertDistrict('Tsuen Wan District') },
        { value: 'Tuen Mun District', option: convertDistrict('Tuen Mun District') },
        { value: 'Yuen Long District', option: convertDistrict('Yuen Long District') },
      ]
    : [];

  return (
    <form onSubmit={handleSubmit(handleUpdateOrderInformation)}>
      <div className="space-y-8">
        <div>
          <DeliveryOptionSelector setValue={setValue} selectedDeliveryOptionId={deliveryOptionId} />
        </div>
        <div>
          <div className="font-semibold text-primary-text mb-2">{t('deliveryAddress')}</div>
          <TextInput
            disabled={isPending}
            register={register}
            registerName="contactName"
            title={t('contactName')}
            type="text"
          />
          <TextInput
            disabled={isPending}
            register={register}
            registerName="contactPhoneNumber"
            title={t('contactPhoneNumber')}
            type="text"
          />
          <SelectInput
            noLoadingShimmer={isPickUp && !isPending}
            blankOption={false}
            title={t('deliveryRegion')}
            register={register}
            disabled={isPickUp || isPending}
            registerName="deliveryRegion"
            selectOptions={regionSelectOptions}
            errors={errors}
          />
          <SelectInput
            noLoadingShimmer={isPickUp && !isPending}
            blankOption={false}
            title={t('deliveryDistrict')}
            register={register}
            disabled={isPickUp || isPending}
            registerName="deliveryDistrict"
            selectOptions={districtSelectOptions}
            errors={errors}
          />
          <TextInput
            noLoadingShimmer={isPickUp && !isPending}
            disabled={isPickUp || isPending}
            register={register}
            registerName="deliveryDetailAddress"
            title={t('deliveryDetailAddress')}
            type="text"
          />
        </div>
        <div className="flex justify-end">
          <BoxButton type="submit" disabled={isPending} theme="primary" fontSize="sm">
            {t('save')}
          </BoxButton>
        </div>
        <ErrorTranslation error={errors.root?.message} align="right" />
        <ErrorTranslation error={errors.deliveryRegion?.message} align="right" />
        <ErrorTranslation error={error} align="right" />
      </div>
    </form>
  );
};
export default EditOrderInformationForm;
