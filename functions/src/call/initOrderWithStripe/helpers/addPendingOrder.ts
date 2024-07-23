import { Timestamp } from 'firebase-admin/firestore';
import { removeEmptyFieldFormObject } from '../../../lib/helpers/object/removeEmptyFieldFormObject';
import { generateRandomCode } from '../../../lib/helpers/string/generateRandomCode';
import { DeliveryOptionData } from '../../../models/deliveryOption/DeliveryOptionData';
import { CartItemData } from '../../../models/user/cartItem/CartItemData';
import { UserData } from '../../../models/user/UserData';
import { CouponUsedData } from '../../../models/coupon/CouponUsedData';
import { OrderData } from '../../../models/order/OrderData';
import { Order } from '../../../models/order/Order';
import { convertOrderData } from '../../../lib/converters/convertOrderData';
import { Region } from '../../../types/Region';
import { District } from '../../../types/District';
import { db } from '../../../admin';
import { OrderItem } from '../../../models/order/OrderItem';

interface AddPendingOrderParameters {
  userId: string;
  userData: UserData & { id: string };
  totalQuantity: number;
  totalPriceBeforeDiscount: number;
  totalPriceAfterDiscount: number;
  discountAmount: number;
  amountToPay: number;
  couponsUsedData: (CouponUsedData & { id: string })[];
  cartItemsData: (CartItemData & { id: string })[];

  isPickUp: boolean;
  deliveryAddressId: string;
  deliveryRegion: Region;
  deliveryDistrict: District;
  deliveryDetailAddress: string;
  contactName: string;
  contactPhoneNumber: string;
  addressRemark?: string;
  storeName?: string;
  storePhoneNumber?: string;
  deliveryOptionId: string;
  deliveryOptionData: DeliveryOptionData;
  deliveryChargeAtThisOrder: number;
}

export const addPendingOrder = async ({
  userId,
  userData,
  totalQuantity,
  totalPriceBeforeDiscount,
  totalPriceAfterDiscount,
  discountAmount,
  amountToPay,
  couponsUsedData,
  cartItemsData,
  isPickUp,
  deliveryOptionId,
  deliveryAddressId,
  deliveryRegion,
  deliveryDistrict,
  deliveryDetailAddress,
  contactName,
  contactPhoneNumber,
  addressRemark,
  storeName,
  storePhoneNumber,
  deliveryOptionData,
  deliveryChargeAtThisOrder,
}: AddPendingOrderParameters): Promise<Order> => {
  const pendingOrdersRef = db.collection('pendingOrders');

  const orderItems: OrderItem[] = cartItemsData.map(
    (cartItem): OrderItem => ({
      id: cartItem.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      nameEN: cartItem.nameEN,
      nameZH: cartItem.nameZH,
      markedPrice: cartItem.markedPrice,
      stock: cartItem.stock,
      brandId: cartItem.brandId,
      brandNameZH: cartItem.brandNameZH,
      brandNameEN: cartItem.brandNameEN,
      categoryId: cartItem.categoryId,
      categoryNameEN: cartItem.categoryNameEN,
      categoryNameZH: cartItem.categoryNameZH,
      collectionId: cartItem.collectionId,
      collectionNameZH: cartItem.categoryNameZH,
      collectionNameEN: cartItem.categoryNameEN,
      descriptionEN: cartItem.descriptionEN,
      descriptionZH: cartItem.descriptionZH,
      image: cartItem.image,
      sellingPrice: cartItem.sellingPrice,
    })
  );

  const pendingOrderData: OrderData = {
    queryCode: generateRandomCode(6, 'digit-letter', 'uppercase'),
    userId,
    userRole: userData.role,
    userAvatar: userData.avatar,
    userEmail: userData.email,
    userFirstName: userData.firstName,
    userLastName: userData.lastName,
    userPhoneNumber: userData.phoneNumber,
    totalQuantity,
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    amountToPay,
    couponsUsed: couponsUsedData,
    commentedProductIds: [],
    orderItems: orderItems,
    isPickUp,
    deliveryAddressId,
    deliveryDetailAddress,
    deliveryDistrict,
    deliveryRegion,
    contactName,
    contactPhoneNumber,
    storeName,
    storePhoneNumber,
    addressRemark,
    deliveryOptionApplyThresholdBeforeCoupons: deliveryOptionData.applyThresholdBeforeCoupons,
    deliveryOptionDeliveryCharge: deliveryOptionData.deliveryCharge,
    deliveryOptionEstimatedTimeEN: deliveryOptionData.estimatedTimeEN,
    deliveryOptionEstimatedTimeZH: deliveryOptionData.estimatedTimeZH,
    deliveryOptionId,
    deliveryOptionNameEN: deliveryOptionData.nameEN,
    deliveryOptionNameZH: deliveryOptionData.nameZH,
    deliveryOptionDeliveryProviderEN: deliveryOptionData.deliveryProviderEN,
    deliveryOptionDeliveryProviderZH: deliveryOptionData.deliveryProviderZH,
    deliveryOptionDescriptionEN: deliveryOptionData.descriptionEN,
    deliveryOptionDescriptionZH: deliveryOptionData.descriptionZH,
    deliveryOptionFreeDeliveryThreshold: deliveryOptionData.freeDeliveryThreshold,
    discountAmount,
    applicationForRefund: false,
    refundImages: [],
    isPaid: false,
    status: 'Placed',
    statusHistories: [
      {
        id: crypto.randomUUID(),
        status: 'Placed',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ],
    deliveryChargeAtThisOrder: deliveryChargeAtThisOrder,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  const filteredPendingOrderData = removeEmptyFieldFormObject(pendingOrderData);

  const res = await pendingOrdersRef.add(filteredPendingOrderData);

  const pendingOrderId = res.id;

  const pendingOrder = convertOrderData({ orderData: filteredPendingOrderData, orderId: pendingOrderId });

  return pendingOrder;
};
