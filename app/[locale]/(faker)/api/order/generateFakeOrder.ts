import { Product } from '@/models/product/Product';
import { FieldValue, Timestamp } from 'firebase/firestore';
import { generateFakeOrderItem } from './generateFakeOrderItem';
import { UserData } from '../user/generateFakeUser';
import { CouponUsed } from '@/models/coupon/CouponUsed';
import { StatusHistory } from '@/models/order/StatusHistory';
import { Order } from '@/models/order/Order';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { districts } from '@/types/District';
import { regions } from '@/types/Region';
import { generateRandomCode } from '@/lib/helpers/string/generateRandomCode';
import { Coupon } from '@/models/coupon/Coupon';
import { OrderItem } from '@/models/order/OrderItem';

interface OrderData
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paidAt' | 'user' | 'couponsUsed' | 'statusHistories'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  paidAt?: FieldValue;
  statusHistories: StatusHistoryData[];
  user: UserData & { id: string };
  couponsUsed: (CouponUsedData & { id: string })[];
}

interface StatusHistoryData extends Omit<StatusHistory, 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface CouponUsedData extends Omit<CouponUsed, 'id' | 'updatedAt' | 'createdAt' | 'startDate' | 'endDate'> {
  updatedAt: FieldValue;
  createdAt: FieldValue;
  startDate?: FieldValue;
  endDate?: FieldValue;
}

interface GenerateFakeOrderParameters {
  products: Product[];
  users: User[];
  deliveryOptions: DeliveryOption[];
  coupons: Coupon[];
  orderId: string;
}

export const generateFakeOrder = async ({
  products,
  users,
  deliveryOptions,
  coupons,
  orderId,
}: GenerateFakeOrderParameters): Promise<OrderData> => {
  const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
  const {
    id: userId,
    role: userRole,
    avatar: userAvatar,
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    phoneNumber,
    username,
    dateOfBirth,
    createdAt,
    updatedAt,
    registeredAt,
    lastLoggedInAt,
  } = randomUser;

  const orderItems: OrderItem[] = [];

  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    const orderItem = await generateFakeOrderItem({ products, user: randomUser, orderId });
    orderItems.push(orderItem);
  }

  const totalQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPriceBeforeDiscount = orderItems.reduce((acc, item) => {
    const { quantity, markedPrice, sellingPrice } = item;
    const unitPrice = sellingPrice ?? markedPrice;
    return acc + unitPrice * quantity;
  }, 0);

  const randomNumberOfCoupons = faker.number.int({ min: 0, max: 10 });

  const selectedCoupons = Array.from({ length: randomNumberOfCoupons })
    .map(() => coupons.sort(() => Math.random() - 1).pop())
    .filter((coupon) => coupon !== undefined)
    .filter((coupon) => !coupon.canBeUsedTogether)
    .filter((coupon) => (coupon.minimumSpend ? coupon.minimumSpend < totalPriceBeforeDiscount : true))
    .filter((coupon) => coupon.isPublic);

  const couponsUsed = selectedCoupons.map((coupon): CouponUsedData & { id: string } => {
    const discountAmountAtThisOrder =
      coupon.discountType === 'fixed'
        ? coupon.discountAmount
        : Math.max(+((totalPriceBeforeDiscount * coupon.discountAmount) / 100).toFixed(2), coupon.maximumDiscount ?? 0);

    return removeEmptyFieldFormObject({
      ...coupon,
      discountAmountAtThisOrder,
      startDate: coupon.startDate ? Timestamp.fromMillis(coupon.startDate) : undefined,
      endDate: coupon.endDate ? Timestamp.fromMillis(coupon.endDate) : undefined,
      createdAt: Timestamp.fromMillis(coupon.createdAt),
      updatedAt: Timestamp.fromMillis(coupon.updatedAt),
    });
  });

  const discount = couponsUsed.reduce((acc, coupon) => acc + coupon.discountAmountAtThisOrder, 0);

  const totalPriceAfterDiscount = totalPriceBeforeDiscount - discount;

  const randomDeliveryOption = deliveryOptions[faker.number.int({ min: 0, max: deliveryOptions.length - 1 })];

  const {
    id: deliveryOptionId,
    isPickUp,
    storeAddressDetailAddress,
    storeAddressRegion,
    applyThresholdBeforeCoupons: deliveryOptionApplyThresholdBeforeCoupons,
    deliveryCharge: deliveryOptionDeliveryCharge,
    freeDeliveryThreshold: deliveryOptionFreeDeliveryThreshold,
    storeAddressDistrict,
    nameZH: deliveryOptionNameZH,
    nameEN: deliveryOptionNameEN,
    deliveryProviderZH: deliveryOptionDeliveryProviderZH,
    deliveryProviderEN: deliveryOptionDeliveryProviderEN,
    estimatedTimeZH: deliveryOptionEstimatedTimeZH,
    estimatedTimeEN: deliveryOptionEstimatedTimeEN,
    descriptionZH: deliveryOptionDescriptionZH,
    descriptionEN: deliveryOptionDescriptionEN,
  } = randomDeliveryOption;

  let deliveryChargeAtThisOrder = deliveryOptionDeliveryCharge;

  if (deliveryOptionFreeDeliveryThreshold) {
    if (deliveryOptionApplyThresholdBeforeCoupons) {
      if (totalPriceBeforeDiscount > deliveryOptionFreeDeliveryThreshold) {
        deliveryChargeAtThisOrder = 0;
      }
    }
    if (!deliveryOptionApplyThresholdBeforeCoupons) {
      if (totalPriceAfterDiscount > deliveryOptionFreeDeliveryThreshold) {
        deliveryChargeAtThisOrder = 0;
      }
    }
  }

  const amountToPay = totalPriceAfterDiscount + deliveryChargeAtThisOrder;

  const orderPlacedTime = new Date(new Date().getTime() - faker.number.int({ min: 10, max: 600000 }));
  return removeEmptyFieldFormObject({
    queryCode: generateRandomCode(6, 'digit-letter', 'uppercase'),
    userId,
    userRole,
    userAvatar,
    userEmail,
    userFirstName,
    userLastName,
    user: removeEmptyFieldFormObject({
      ...randomUser,
      createdAt: Timestamp.fromMillis(createdAt),
      updatedAt: Timestamp.fromMillis(updatedAt),
      registeredAt: registeredAt ? Timestamp.fromMillis(registeredAt) : undefined,
      lastLoggedInAt: Timestamp.fromMillis(lastLoggedInAt),
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    }),
    status: 'Paid',
    statusHistories: [
      {
        id: faker.string.uuid(),
        status: 'Placed',
        createdAt: Timestamp.fromDate(orderPlacedTime),
        updatedAt: Timestamp.fromDate(orderPlacedTime),
      },
      {
        id: faker.string.uuid(),
        status: 'Paid',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    paidAt: Timestamp.now(),
    isPaid: true,
    isPickUp,
    contactName: username ?? faker.person.fullName(),
    contactPhoneNumber: phoneNumber ?? faker.phone.number(),
    deliveryOptionId,
    deliveryDetailAddress: isPickUp
      ? storeAddressDetailAddress ?? faker.location.streetAddress()
      : faker.location.streetAddress(),
    deliveryChargeAtThisOrder,
    deliveryAddressId: isPickUp ? undefined : faker.string.uuid(),
    deliveryOptionEstimatedTimeZH,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionDeliveryProviderZH,
    deliveryOptionDeliveryProviderEN,
    deliveryOptionDescriptionZH,
    deliveryOptionDescriptionEN,
    deliveryOptionDeliveryCharge,
    deliveryOptionFreeDeliveryThreshold,
    deliveryOptionApplyThresholdBeforeCoupons,
    deliveryDistrict: isPickUp
      ? storeAddressDistrict ?? districts[faker.number.int({ min: 0, max: districts.length - 1 })]
      : districts[faker.number.int({ min: 0, max: districts.length - 1 })],
    deliveryRegion: isPickUp
      ? storeAddressRegion ?? regions[faker.number.int({ min: 0, max: regions.length - 1 })]
      : regions[faker.number.int({ min: 0, max: regions.length - 1 })],
    deliveryOptionNameZH,
    deliveryOptionNameEN,
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    amountToPay,
    orderItems,
    commentedProductIds: [],
    couponsUsed,
    totalQuantity,
    addressRemark: isPickUp ? undefined : faker.word.noun(),
    applicationForRefund: false,
    refundImages: [],
  });
};
