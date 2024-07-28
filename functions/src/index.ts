import * as admin from 'firebase-admin';

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

// firestore trigger functions
import { onCreateBrand } from './db/classification/brand/onCreateBrand';
import { onUpdateBrand } from './db/classification/brand/onUpdateBrand';
export { onCreateBrand, onUpdateBrand };

import { onCreateCollection } from './db/classification/collection/onCreateCollection';
import { onUpdateCollection } from './db/classification/collection/onUpdateCollection';
export { onCreateCollection, onUpdateCollection };

import { onCreateCategory } from './db/classification/category/onCreateCategory';
import { onUpdateCategory } from './db/classification/category/onUpdateCategory';
export { onCreateCategory, onUpdateCategory };

import { onCreateTag } from './db/classification/tag/onCreateTag';
import { onUpdateTag } from './db/classification/tag/onUpdateTag';
export { onCreateTag, onUpdateTag };

import { onCreateCoupon } from './db/coupon/onCreateCoupon';
import { onUpdateCoupon } from './db/coupon/onUpdateCoupon';
export { onCreateCoupon, onUpdateCoupon };

import { onCreateCouponUsageRecord } from './db/coupon/usageRecord/onCreateCouponUsageRecord';
import { onUpdateCouponUsageRecord } from './db/coupon/usageRecord/onUpdateCouponUsageRecord';
export { onCreateCouponUsageRecord, onUpdateCouponUsageRecord };

import { onCreateDeliveryOption } from './db/deliveryOption/onCreateDeliveryOption';
import { onUpdateDeliveryOption } from './db/deliveryOption/onUpdateDeliveryOption';
export { onCreateDeliveryOption, onUpdateDeliveryOption };

import { onCreateDeliveryOptionUsageRecord } from './db/deliveryOption/usageRecord/onCreateDeliveryOptionUsageRecord';
import { onUpdateDeliveryOptionUsageRecord } from './db/deliveryOption/usageRecord/onUpdateDeliveryOptionUsageRecord';
export { onCreateDeliveryOptionUsageRecord, onUpdateDeliveryOptionUsageRecord };

import { onCreateNotification } from './db/notification/onCreateNotification';
export { onCreateNotification };

import { onCreateOrder } from './db/order/onCreateOrder';
import { onUpdateOrder } from './db/order/onUpdateOrder';
export { onCreateOrder, onUpdateOrder };

import { onUpdatePendingOrder } from './db/pendingOrder/onUpdatePendingOrder';
export { onUpdatePendingOrder };

import { onCreateProduct } from './db/product/onCreateProduct';
import { onUpdateProduct } from './db/product/onUpdateProduct';
export { onCreateProduct, onUpdateProduct };

import { onCreatePromotion } from './db/promotion/onCreatePromotion';
import { onUpdatePromotion } from './db/promotion/onUpdatePromotion';
export { onCreatePromotion, onUpdatePromotion };

import { onCreateSalesRecord } from './db/saleRecord/onCreateSalesRecord';
import { onUpdateSalesRecord } from './db/saleRecord/onUpdateSalesRecord';
export { onCreateSalesRecord, onUpdateSalesRecord };

import { onUpdateComment } from './db/comment/onUpdateComment';
import { onDeleteComment } from './db/comment/onDeleteComment';
export { onUpdateComment, onDeleteComment };

import { onCreateReply } from './db/reply/onCreateReply';
import { onUpdateReply } from './db/reply/onUpdateReply';
export { onCreateReply, onUpdateReply };

import { onCreateSmartBar } from './db/smartBar/onCreateSmartBar';
import { onUpdateSmartBar } from './db/smartBar/onUpdateSmartBar';
export { onCreateSmartBar, onUpdateSmartBar };

import { onCreateStoreAddress } from './db/storeAddress/onCreateStoreAddress';
import { onUpdateStoreAddress } from './db/storeAddress/onUpdateStoreAddress';
export { onCreateStoreAddress, onUpdateStoreAddress };

import { onCreateUser } from './db/user/onCreateUser';
import { onUpdateUser } from './db/user/onUpdateUser';
export { onCreateUser, onUpdateUser };

import { onCreateAddress } from './db/user/address/onCreateAddress';
import { onUpdateAddress } from './db/user/address/onUpdateAddress';
import { onDeleteAddress } from './db/user/address/onDeleteAddress';
export { onCreateAddress, onUpdateAddress, onDeleteAddress };

import { onCreateCartItem } from './db/user/cartItem/onCreateCartItem';
import { onDeleteCartItem } from './db/user/cartItem/onDeleteCartItem';
import { onUpdateCartItem } from './db/user/cartItem/onUpdateCartItem';
export { onCreateCartItem, onDeleteCartItem, onUpdateCartItem };

import { onCreateWishlistItem } from './db/user/wishlistItem/onCreateWishlistItem';
import { onDeleteWishlistItem } from './db/user/wishlistItem/onDeleteWishlistItem';
import { onUpdateWishlistItem } from './db/user/wishlistItem/onUpdateWishlistItem';
export { onCreateWishlistItem, onDeleteWishlistItem, onUpdateWishlistItem };

import { onCreateUserNotification } from './db/user/notification/onCreateUserNotification';
import { onDeleteUserNotification } from './db/user/notification/onDeleteUserNotification';
import { onUpdateUserNotification } from './db/user/notification/onUpdateUserNotification';
export { onCreateUserNotification, onDeleteUserNotification, onUpdateUserNotification };

// callable functions
import { initOrderWithStripe } from './call/initOrderWithStripe/initOrderWithStripe';
export { initOrderWithStripe };

import { initOrderWithPaypal } from './call/initOrderWithPaypal/initOrderWithPaypal';
export { initOrderWithPaypal };

import { verifyStockPrePayment } from './call/verifyStockPrePayment/verifyStockPrePayment';
export { verifyStockPrePayment };

import { getOrderByIdAndQueryCode } from './call/getOrderByIdAndQueryCode/getOrderByIdAndQueryCode';
export { getOrderByIdAndQueryCode };

import { upgradeUserToAdmin } from './call/upgradeUserToAdmin/upgradeUserToAdmin';
export { upgradeUserToAdmin };

import { downgradeUserFromAdmin } from './call/downgradeUserFromAdmin/downgradeUserFromAdmin';
export { downgradeUserFromAdmin };

import { refundProcess } from './call/refundProcess/refundProcess';
export { refundProcess };

import { applyForRefund } from './call/applyForRefund/applyForRefund';
export { applyForRefund };

// request functions
import { stripeWebhook } from './request/stripeWebhook/stripeWebhook';
export { stripeWebhook };

import { paypalWebhook } from './request/paypalWebhook/paypalWebhook';
export { paypalWebhook };
