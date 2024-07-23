import { onCall, HttpsError } from 'firebase-functions/v2/https';

import { getCartItems } from './helpers/getCartItems';
import { validateCartItems } from './helpers/validateCartItems';
import { calculateTotalAmount } from './helpers/calculateTotalAmount';
import { validateCoupon } from './helpers/validateCoupon';
import { addPendingOrder } from './helpers/addPendingOrder';
import { getUser } from './helpers/getUser';
import { calculateDeliveryCharge } from './helpers/calculateDeliveryCharge';
import { stripe } from '../../stripe/config';
import { Order } from '../../models/order/Order';
import { District } from '../../types/District';
import { Region } from '../../types/Region';
import { logger } from 'firebase-functions/v1';

interface Request {
  formData: OrderPlacementFormData;
}

interface Response {
  clientSecret: string | null;
  pendingOrder: Order;
}

interface OrderPlacementFormData {
  couponCodes: string[];
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
  deliveryOptionNameZH: string;
  deliveryOptionNameEN: string;
  deliveryOptionDescriptionZH?: string;
  deliveryOptionDescriptionEN?: string;
  deliveryOptionDeliveryCharge: number;
  deliveryOptionDeliveryProviderZH?: string;
  deliveryOptionDeliveryProviderEN?: string;
  deliveryOptionEstimatedTimeZH?: string;
  deliveryOptionEstimatedTimeEN?: string;
  deliveryOptionDeliverySchema?: number;
}

export const initOrderWithStripe = onCall<Request, Promise<Response>>(async (request) => {
  try {
    const userAuth = request.auth;
    if (!userAuth) {
      throw new HttpsError('unauthenticated', 'No user information');
    }
    const userId = userAuth.uid;

    const { formData } = request.data;

    const {
      couponCodes,
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
      isPickUp,
    } = formData;

    const userData = await getUser(userId);

    const cartItemsData = await getCartItems(userId);

    const modifiedCartItems = await validateCartItems(cartItemsData);

    const { totalPriceInCents, totalPriceInDollar, totalQuantity } = calculateTotalAmount(modifiedCartItems);

    const { discountAmountInCents, discountAmountInDollar, couponsUsedData } = await validateCoupon({
      userId,
      couponCodes,
      orderTotalPrice: totalPriceInDollar,
      isAnonymous: userData.isAnonymous,
    });

    const { deliveryChargeInCents, deliveryChargeInDollar, deliveryOptionData } = await calculateDeliveryCharge({
      deliveryOptionId,
      totalPriceAfterCouponInDollar: totalPriceInDollar - discountAmountInDollar,
      totalPriceBeforeCouponInDollar: totalPriceInDollar,
    });

    const minimumPriceByStripInCent = 400;
    const amountToPayInCents = totalPriceInCents - discountAmountInCents + deliveryChargeInCents;
    const amountToPayInDollar = amountToPayInCents / 100;

    if (amountToPayInCents <= minimumPriceByStripInCent) {
      throw new HttpsError('invalid-argument', `Not meet minimum spent ($${minimumPriceByStripInCent / 100})`);
    }

    const pendingOrder = await addPendingOrder({
      userId,
      userData,
      isPickUp,
      deliveryAddressId,
      deliveryRegion,
      deliveryDistrict,
      deliveryDetailAddress,
      contactName,
      contactPhoneNumber,
      addressRemark,
      storeName,
      storePhoneNumber,
      cartItemsData: modifiedCartItems,
      couponsUsedData,
      totalQuantity,
      deliveryOptionId,
      amountToPay: amountToPayInDollar,
      discountAmount: discountAmountInDollar,
      totalPriceAfterDiscount: totalPriceInDollar - discountAmountInDollar,
      totalPriceBeforeDiscount: totalPriceInDollar,
      deliveryOptionData,
      deliveryChargeAtThisOrder: deliveryChargeInDollar,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToPayInCents,
      currency: 'hkd',
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: userData.email,
      metadata: {
        userId,
        pendingOrderId: pendingOrder.id,
      },
      description: `User id: ${userId} / Pending order id: ${pendingOrder.id}`,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      pendingOrder,
    };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw new HttpsError(error.code, error.message);
    }
    logger.error('Error on creating pending order and payment intent', error);
    throw new HttpsError('internal', 'Unexpected error. Please try again later.');
  }
});
