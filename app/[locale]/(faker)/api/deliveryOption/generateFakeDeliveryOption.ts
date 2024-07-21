import { fakerZH_TW as faker } from '@faker-js/faker';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { StoreAddress } from '@/models/store/StoreAddress';

interface DeliveryOptionData extends Omit<DeliveryOption, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

interface GenerateFakeDeliveryOptionParameters {
  storeAddresses: StoreAddress[];
}

export const generateFakeDeliveryOption = ({
  storeAddresses,
}: GenerateFakeDeliveryOptionParameters): DeliveryOptionData => {
  const isPickUp = faker.datatype.boolean();

  const randomStoreAddresses = storeAddresses[faker.number.int({ min: 0, max: storeAddresses.length - 1 })];

  const storeAddressId = isPickUp ? randomStoreAddresses.id : undefined;
  const storeAddressName = isPickUp ? randomStoreAddresses.name : undefined;
  const storeAddressRegion = isPickUp ? randomStoreAddresses.region : undefined;
  const storeAddressDistrict = isPickUp ? randomStoreAddresses.district : undefined;
  const storeAddressDetailAddress = isPickUp ? randomStoreAddresses.detailAddress : undefined;
  const storeAddressPhoneNumber = isPickUp ? randomStoreAddresses.phoneNumber : undefined;
  const storeAddressBusinessHours = isPickUp ? randomStoreAddresses.businessHours : undefined;

  const name = faker.commerce.productName();
  const description = faker.datatype.boolean() ? faker.commerce.productDescription() : undefined;
  const deliveryProvider = faker.datatype.boolean() ? faker.company.name() : undefined;
  const estimatedTime = faker.number.int({ min: 1, max: 5 });

  return removeEmptyFieldFormObject({
    nameZH: name,
    nameEN: name,
    descriptionZH: description,
    descriptionEN: description,
    deliveryProviderEN: deliveryProvider,
    deliveryProviderZH: deliveryProvider,
    deliveryCharge: faker.number.int({ min: 10, max: 100 }),
    estimatedTimeZH: `${estimatedTime}天`,
    estimatedTimeEN: `${estimatedTime} days`,
    isPublic: faker.datatype.boolean(),
    freeDeliveryThreshold: faker.datatype.boolean() ? faker.number.int({ min: 50, max: 200 }) : undefined,
    applyThresholdBeforeCoupons: faker.datatype.boolean(),
    deliveryProvider: faker.datatype.boolean() ? faker.company.name() : undefined,
    isPickUp,
    storeAddressId,
    storeAddressName,
    storeAddressRegion,
    storeAddressDistrict,
    storeAddressDetailAddress,
    storeAddressPhoneNumber,
    storeAddressBusinessHours,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
