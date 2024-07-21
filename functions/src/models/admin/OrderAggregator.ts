export interface OrderAggregator {
  // Only increment when the order is created
  totalOrderCount?: number;

  // Increment when status change to Placed / Paid / Delivering / Ready for Pickup / Application for Refund / Refund Pending / Refund Failed / Refund Cancelled
  // Decrement overwise
  processingOrderCount?: number;

  // Increment when status change to Placed / Paid
  // Decrement overwise
  notDeliveredOrderCount?: number;

  // Increment when status change to Delivering / Ready for pickup
  // Decrement overwise
  deliveringOrderCount?: number;

  // Increment when status change to Delivered / Picked Up
  // Decrement overwise
  arrivedOrderCount?: number;

  // Increment when status change to Application for Refund
  // Decrement overwise
  refundRequestCount?: number;

  // Increment when status change to Refunded
  // Decrement overwise
  refundedOrderCount?: number;

  updatedAt: number;
}
