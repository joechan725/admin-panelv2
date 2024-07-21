import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { OrderAggregator } from '../../../models/admin/OrderAggregator';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../admin';
import { OrderStatus } from '../../../models/order/OrderStatus';
import { logger } from 'firebase-functions/v1';

interface updateOrderAggregatorParameters {
  statusBefore?: OrderStatus;
  statusAfter: OrderStatus;
}

/**
 * Update the order count in the orderAggregator document
 *
 * @param statusBefore The status before
 * @param statusAfter The status after
 *
 * @returns The promise of void
 */

export const updateOrderAggregator = async ({ statusBefore, statusAfter }: updateOrderAggregatorParameters) => {
  try {
    if (statusBefore === statusAfter) {
      return;
    }

    const orderAggregatorRef = db.collection('admin').doc('orderAggregator');
    const incrementOrderAggregator: Required<Omit<OrderAggregator, 'updatedAt'>> = {
      totalOrderCount: 0,
      processingOrderCount: 0,
      notDeliveredOrderCount: 0,
      deliveringOrderCount: 0,
      arrivedOrderCount: 0,
      refundRequestCount: 0,
      refundedOrderCount: 0,
    };

    if (statusBefore === undefined) {
      incrementOrderAggregator.totalOrderCount++;
    }

    if (
      statusBefore === 'Placed' ||
      statusBefore === 'Paid' ||
      statusBefore === 'Delivering' ||
      statusBefore === 'Ready for Pickup' ||
      statusBefore === 'Application for Refund' ||
      statusBefore === 'Refund Pending' ||
      statusBefore === 'Refund Failed' ||
      statusBefore === 'Refund Cancelled'
    ) {
      incrementOrderAggregator.processingOrderCount--;
    }

    if (
      statusAfter === 'Placed' ||
      statusAfter === 'Paid' ||
      statusAfter === 'Delivering' ||
      statusAfter === 'Ready for Pickup' ||
      statusAfter === 'Application for Refund' ||
      statusAfter === 'Refund Pending' ||
      statusAfter === 'Refund Failed' ||
      statusAfter === 'Refund Cancelled'
    ) {
      incrementOrderAggregator.processingOrderCount++;
    }

    if (statusBefore === 'Placed' || statusBefore === 'Paid') {
      incrementOrderAggregator.notDeliveredOrderCount--;
    }

    if (statusAfter === 'Placed' || statusAfter === 'Paid') {
      incrementOrderAggregator.notDeliveredOrderCount++;
    }

    if (statusBefore === 'Delivering' || statusBefore === 'Ready for Pickup') {
      incrementOrderAggregator.deliveringOrderCount--;
    }

    if (statusAfter === 'Delivering' || statusAfter === 'Ready for Pickup') {
      incrementOrderAggregator.deliveringOrderCount++;
    }

    if (statusBefore === 'Delivered' || statusBefore === 'Picked Up') {
      incrementOrderAggregator.arrivedOrderCount--;
    }

    if (statusAfter === 'Delivered' || statusAfter === 'Picked Up') {
      incrementOrderAggregator.arrivedOrderCount++;
    }

    if (statusBefore === 'Application for Refund') {
      incrementOrderAggregator.refundRequestCount--;
    }

    if (statusAfter === 'Application for Refund') {
      incrementOrderAggregator.refundRequestCount++;
    }

    if (statusBefore === 'Refunded') {
      incrementOrderAggregator.refundRequestCount--;
    }

    if (statusAfter === 'Refunded') {
      incrementOrderAggregator.refundRequestCount++;
    }

    const {
      totalOrderCount,
      processingOrderCount,
      notDeliveredOrderCount,
      deliveringOrderCount,
      arrivedOrderCount,
      refundRequestCount,
      refundedOrderCount,
    } = incrementOrderAggregator;

    const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
      totalOrderCount: FieldValue.increment(totalOrderCount),
      processingOrderCount: FieldValue.increment(processingOrderCount),
      notDeliveredOrderCount: FieldValue.increment(notDeliveredOrderCount),
      deliveringOrderCount: FieldValue.increment(deliveringOrderCount),
      arrivedOrderCount: FieldValue.increment(arrivedOrderCount),
      refundRequestCount: FieldValue.increment(refundRequestCount),
      refundedOrderCount: FieldValue.increment(refundedOrderCount),
      updatedAt: FieldValue.serverTimestamp(),
    };
    await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
  } catch (error) {
    logger.error('Error on updating admin order aggregator', error);
  }
};

// if (statusBefore === undefined && statusAfter === 'Paid') {
//   const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//     totalOrderCount: FieldValue.increment(1),
//     processingOrderCount: FieldValue.increment(1),
//     notDeliveredOrderCount: FieldValue.increment(1),
//     updatedAt: FieldValue.serverTimestamp(),
//   };
//   await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
// }

// if (statusBefore === 'Paid') {
//   if (statusAfter === 'Delivering' || statusAfter === 'Ready for Pickup') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       notDeliveredOrderCount: FieldValue.increment(-1),
//       deliveringOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Delivered' || statusAfter === 'Picked Up') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       notDeliveredOrderCount: FieldValue.increment(-1),
//       arrivedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Application for Refund') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       notDeliveredOrderCount: FieldValue.increment(-1),
//       refundRequestCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Pending' || statusAfter === 'Refund Failed' || statusAfter === 'Refund Cancelled') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       notDeliveredOrderCount: FieldValue.increment(-1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       notDeliveredOrderCount: FieldValue.increment(-1),
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }

// if (statusBefore === 'Delivering' || statusBefore === 'Ready for Pickup') {
//   if (statusAfter === 'Delivered' || statusAfter === 'Picked Up') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       deliveringOrderCount: FieldValue.increment(-1),
//       arrivedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Application for Refund') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       deliveringOrderCount: FieldValue.increment(-1),
//       refundRequestCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Pending' || statusAfter === 'Refund Failed' || statusAfter === 'Refund Cancelled') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       deliveringOrderCount: FieldValue.increment(-1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       deliveringOrderCount: FieldValue.increment(-1),
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }

// if (statusBefore === 'Delivered' || statusBefore === 'Picked Up') {
//   if (statusAfter === 'Application for Refund') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(1),
//       refundRequestCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Pending' || statusAfter === 'Refund Failed' || statusAfter === 'Refund Cancelled') {
//     // null;
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }

// if (statusBefore === 'Application for Refund') {
//   if (statusAfter === 'Refund Request Reject') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       refundRequestCount: FieldValue.increment(-1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Pending' || statusAfter === 'Refund Failed' || statusAfter === 'Refund Cancelled') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(-1),
//       refundRequestCount: FieldValue.increment(-1),
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }

// if (statusBefore === 'Refund Request Reject') {
//   if (statusAfter === 'Application for Refund') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(1),
//       refundRequestCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Delivering' || statusAfter === 'Ready for Pickup') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(1),
//       deliveringOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Delivered' || statusAfter === 'Picked Up') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       arrivedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Pending' || statusAfter === 'Refund Failed' || statusAfter === 'Refund Cancelled') {
//     // null;
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }

// if (statusBefore === 'Refund Pending' || statusBefore === 'Refund Failed' || statusBefore === 'Refund Cancelled') {
//   if (statusAfter === 'Delivering' || statusAfter === 'Ready for Pickup') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(1),
//       deliveringOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Delivered' || statusAfter === 'Picked Up') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       arrivedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Application for Refund') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       processingOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
//   if (statusAfter === 'Refund Request Reject') {
//     // null;
//   }
//   if (statusAfter === 'Refunded') {
//     const updateOrderAggregator: ExtendWithFieldValue<Partial<OrderAggregator>> = {
//       refundedOrderCount: FieldValue.increment(1),
//       updatedAt: FieldValue.serverTimestamp(),
//     };
//     await orderAggregatorRef.set(updateOrderAggregator, { merge: true });
//   }
// }
