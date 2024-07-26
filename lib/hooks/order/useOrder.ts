import { handleImagesUpload } from '@/firebase/api/image/handleImagesUpload';
import { getOrder } from '@/firebase/api/order/getOrder';
import { getOrders } from '@/firebase/api/order/getOrders';
import { updateOrder, UpdateOrderFirestoreData } from '@/firebase/api/order/updateOrder';
import { addBlankComment, AddBlankCommentFirestoreData } from '@/firebase/api/product/comment/addBlankComment';
import { updateProduct, UpdateProductFirestoreData } from '@/firebase/api/product/updateProduct';
import { applyForRefund } from '@/firebase/callable/applyForRefund';
import { getOrderByIdAndQueryCode } from '@/firebase/callable/getOrderByIdAndQueryCode';
import { refundProcess } from '@/firebase/callable/refundProcess';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { ImageInput } from '@/models/ImageInput';
import { Order } from '@/models/order/Order';
import { OrderItem } from '@/models/order/OrderItem';
import { StatusHistory } from '@/models/order/StatusHistory';
import { OrderInformationSchema } from '@/schemas/order/orderInformationSchema';
import { OrderRefundSchema } from '@/schemas/order/orderRefundSchema';
import { OrderStatusSchema } from '@/schemas/order/orderStatusSchema';
import { ApplyRefundSchema } from '@/schemas/order/applyRefundSchema';
import { arrayUnion, FieldValue, increment, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface LoadOrderByIdAndQueryCodeParameters {
  orderId: string;
  queryCode: string;
}

interface UpdateOrderStatusParameters {
  order?: Order;
  orderId: string;
  formData: OrderStatusSchema;
}

interface RemoveOrderStatusHistoryParameters {
  orderId: string;
  statusHistoryId: string;
}

interface UpdateOrderInformationParameters {
  orderId: string;
  formData: OrderInformationSchema;
}

interface RemoveOrderItemFromOrderParameters {
  order?: Order;
  orderId: string;
  orderItemId: string;
  incrementProductStock: boolean;
}

interface RemoveOrderItemsFromOrderParameters {
  order?: Order;
  orderId: string;
  orderItemIds: string[];
  incrementProductStock: boolean;
}

interface AddItemToOrderParameters {
  order?: Order;
  orderId: string;
  orderItem?: OrderItem;
  decrementProductStock: boolean;
}

interface AddItemsToOrderParameters {
  order?: Order;
  orderId: string;
  orderItems: OrderItem[];
  decrementProductStock: boolean;
}

interface RefundApplicationParameters {
  formData: ApplyRefundSchema;
  images: ImageInput[];
  orderId: string;
  queryCode?: string;
}

interface RefundByStripeParameters {
  orderId: string;
  order?: Order;
  formData: OrderRefundSchema;
}

interface RefundByOtherMethodParameters {
  orderId: string;
  order?: Order;
  formData: OrderRefundSchema;
  images: ImageInput[];
}

interface UpdateStatusHistoryStatusFirestoreData extends Omit<StatusHistory, 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const useOrder = () => {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);

  const { toastSuccess, toastError } = useToast();

  const loadOrder = async (orderId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const orderData = await getOrder(orderId);
      setOrder(orderData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('unexpectedError');
    }
  };

  const loadOrderByIdAndQueryCode = async ({ orderId, queryCode }: LoadOrderByIdAndQueryCodeParameters) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const res = await getOrderByIdAndQueryCode({ orderId, queryCode });
      setOrder(res.data.order);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes('incorrect query code')) {
          setError('orderIncorrectQueryCode');
          return;
        }
        if (error.message.toLowerCase().includes('not found')) {
          setError('orderNotFound');
          return;
        }
      }
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadOrders = async (userId?: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const ordersData = await getOrders(userId);
      setOrders(ordersData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('unexpectedError');
    }
  };

  const updateOrderStatus = async ({ orderId, formData }: UpdateOrderStatusParameters) => {
    setIsWriting(true);
    setError(undefined);

    const filteredData = removeEmptyFieldFormObject(formData);
    const updatedStatus: UpdateStatusHistoryStatusFirestoreData = {
      ...filteredData,
      id: crypto.randomUUID(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const orderData: UpdateOrderFirestoreData = {
      status: formData.status,
      statusHistories: arrayUnion(updatedStatus),
      updatedAt: serverTimestamp(),
    };

    try {
      await updateOrder({ orderId, orderData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeOrderStatusHistory = async ({ orderId, statusHistoryId }: RemoveOrderStatusHistoryParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const order = await getOrder(orderId);
      if (!order) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }

      const { statusHistories, status } = order;

      if (!statusHistories || statusHistories.length === 0) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }

      // Check if the delete history is the last one
      const sortedStatusHistories = sortObjectsByKey(statusHistories, 'updatedAt', 'asc');
      const deleteIndex = sortedStatusHistories.findIndex((history) => history.id === statusHistoryId);
      const isDeleteLastOne = deleteIndex === sortedStatusHistories.length - 1;

      // Update the status to the second last one
      let updatedStatus = status;
      if (isDeleteLastOne) {
        sortedStatusHistories.pop();
        updatedStatus = sortedStatusHistories.at(-1)?.status ?? updatedStatus;
      }

      // Filter out the status history by id from the histories
      const filteredStatusHistories = statusHistories.filter((history) => history.id !== statusHistoryId);
      const updateStatusHistoriesData = filteredStatusHistories.map((history) => ({
        ...history,
        createdAt: Timestamp.fromMillis(history.createdAt),
        updatedAt: Timestamp.fromMillis(history.updatedAt),
      }));
      const orderData: UpdateOrderFirestoreData = {
        status: updatedStatus,
        statusHistories: updateStatusHistoriesData,
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData });
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const updateOrderInformation = async ({ orderId, formData }: UpdateOrderInformationParameters) => {
    setIsWriting(true);
    setError(undefined);

    const filteredData = addDeleteFieldForEmptyFieldInObject(formData);

    const orderData: UpdateOrderFirestoreData = {
      ...filteredData,
      updatedAt: serverTimestamp(),
    };
    try {
      await updateOrder({ orderId, orderData });
      toastSuccess(`updated`);
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeItemFromOrder = async ({
    orderItemId,
    orderId,
    order,
    incrementProductStock,
  }: RemoveOrderItemFromOrderParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      // Get the previous order
      const exitingOrder = order ?? (await getOrder(orderId));
      if (!exitingOrder) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }
      const existingOrderItems = exitingOrder.orderItems;
      const orderItemToBeDeleted = existingOrderItems.find((orderItem) => orderItem.id === orderItemId);
      if (!orderItemToBeDeleted) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }
      const { productId, sellingPrice, markedPrice, quantity } = orderItemToBeDeleted;
      const unitPrice = sellingPrice ?? markedPrice;
      // Calculate the new pricing and quantity
      const newTotalQuantity = exitingOrder.totalQuantity - quantity;
      const newTotalPriceBeforeDiscount = exitingOrder.totalPriceBeforeDiscount - quantity * unitPrice;
      const newTotalPriceAfterDiscount = exitingOrder.totalPriceAfterDiscount - quantity * unitPrice;
      const newAmountToPay = exitingOrder.amountToPay - quantity * unitPrice;
      const newOrderItems = existingOrderItems.filter((orderItem) => orderItem.id !== orderItemId);
      const orderData: UpdateOrderFirestoreData = {
        totalQuantity: newTotalQuantity,
        totalPriceBeforeDiscount: newTotalPriceBeforeDiscount,
        totalPriceAfterDiscount: newTotalPriceAfterDiscount,
        amountToPay: newAmountToPay,
        orderItems: newOrderItems,
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData });
      if (incrementProductStock) {
        const productFirestoreData: UpdateProductFirestoreData = {
          stock: increment(quantity),
          updatedAt: serverTimestamp(),
        };
        await updateProduct({ productId, productFirestoreData });
      }
      toastSuccess('removed');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeItemsFromOrder = async ({
    orderItemIds,
    orderId,
    order,
    incrementProductStock,
  }: RemoveOrderItemsFromOrderParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      // Get the previous order
      const exitingOrder = order ?? (await getOrder(orderId));
      if (!exitingOrder) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }
      const existingOrderItems = exitingOrder.orderItems;
      const orderItemsToBeDeleted = existingOrderItems.filter((orderItem) => orderItemIds.includes(orderItem.id));
      if (orderItemsToBeDeleted.length === 0) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }

      // Calculate the new pricing and quantity
      const reducedQuantity = orderItemsToBeDeleted.reduce((acc, item) => acc + item.quantity, 0);
      const reducedPrice = orderItemsToBeDeleted.reduce((acc, item) => {
        const { quantity, sellingPrice, markedPrice } = item;
        const unitPrice = sellingPrice ?? markedPrice;
        return acc + unitPrice * quantity;
      }, 0);

      const newTotalQuantity = exitingOrder.totalQuantity - reducedQuantity;
      const newTotalPriceBeforeDiscount = exitingOrder.totalPriceBeforeDiscount - reducedPrice;
      const newTotalPriceAfterDiscount = exitingOrder.totalPriceAfterDiscount - reducedPrice;
      const newAmountToPay = exitingOrder.amountToPay - reducedPrice;
      const newOrderItems = existingOrderItems.filter((orderItem) => !orderItemIds.includes(orderItem.id));

      const orderData: UpdateOrderFirestoreData = {
        totalQuantity: newTotalQuantity,
        totalPriceBeforeDiscount: newTotalPriceBeforeDiscount,
        totalPriceAfterDiscount: newTotalPriceAfterDiscount,
        amountToPay: newAmountToPay,
        orderItems: newOrderItems,
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData });
      if (incrementProductStock) {
        for (let i = 0; i < orderItemsToBeDeleted.length; i++) {
          const item = orderItemsToBeDeleted[i];
          const { productId, quantity } = item;
          const productFirestoreData: UpdateProductFirestoreData = {
            stock: increment(quantity),
            updatedAt: serverTimestamp(),
          };
          await updateProduct({ productId, productFirestoreData });
        }
      }
      toastSuccess('removed');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const addItemToOrder = async ({ orderId, orderItem, order, decrementProductStock }: AddItemToOrderParameters) => {
    if (!orderItem) {
      setError('selectProduct');
      toastError('selectProduct');
      setIsWriting(false);
      return false;
    }

    setIsWriting(true);
    setError(undefined);

    try {
      // Get the previous order
      const exitingOrder = order ?? (await getOrder(orderId));
      if (!exitingOrder) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }
      const exitingOrderItems = exitingOrder.orderItems;

      // Calculate the new pricing and quantity
      const { productId, sellingPrice, markedPrice, quantity } = orderItem;
      const unitPrice = sellingPrice ?? markedPrice;

      const newTotalQuantity = exitingOrder.totalQuantity + quantity;
      const newTotalPriceBeforeDiscount = exitingOrder.totalPriceBeforeDiscount + quantity * unitPrice;
      const newTotalPriceAfterDiscount = exitingOrder.totalPriceAfterDiscount + quantity * unitPrice;
      const newAmountToPay = exitingOrder.amountToPay + quantity * unitPrice;

      const newOrderItems = [...exitingOrderItems, orderItem];

      const orderData: UpdateOrderFirestoreData = {
        totalQuantity: newTotalQuantity,
        totalPriceBeforeDiscount: newTotalPriceBeforeDiscount,
        totalPriceAfterDiscount: newTotalPriceAfterDiscount,
        amountToPay: newAmountToPay,
        orderItems: newOrderItems,
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData });
      if (decrementProductStock) {
        const productFirestoreData: UpdateProductFirestoreData = {
          stock: increment(-quantity),
          updatedAt: serverTimestamp(),
        };
        await updateProduct({ productId, productFirestoreData });
      }
      toastSuccess('added');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const addItemsToOrder = async ({ orderId, orderItems, order, decrementProductStock }: AddItemsToOrderParameters) => {
    if (!orderItems || orderItems.length === 0) {
      toastError('selectProduct');
      setError('selectProduct');
      setIsWriting(false);
      return false;
    }
    setIsWriting(true);
    setError(undefined);

    try {
      // Get the previous order
      const exitingOrder = order ?? (await getOrder(orderId));
      if (!exitingOrder) {
        toastError('unexpectedError');
        setError('unexpectedError');
        return false;
      }
      const {
        orderItems: exitingOrderItems,
        userId,
        userRole,
        userAvatar,
        userEmail,
        userFirstName,
        userLastName,
      } = exitingOrder;
      for (let i = 0; i < orderItems.length; i++) {
        const { productId, quantity, nameZH, nameEN, descriptionZH, descriptionEN, image } = orderItems[i];
        const commentData: AddBlankCommentFirestoreData = removeEmptyFieldFormObject({
          boughtQuantity: quantity,
          orderId,
          productId,
          productNameZH: nameZH,
          productNameEN: nameEN,
          userId,
          userRole,
          userAvatar,
          userEmail,
          userFirstName,
          userLastName,
          productDescriptionZH: descriptionZH,
          productDescriptionEN: descriptionEN,
          productImage: image,
          published: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        const commentId = await addBlankComment({ commentFirestoreData: commentData });
        orderItems[i].commentId = commentId;
      }

      // Calculate the new pricing and quantity
      const addedQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);
      const addedPrice = orderItems.reduce((acc, item) => {
        const { quantity, sellingPrice, markedPrice } = item;
        const unitPrice = sellingPrice ?? markedPrice;
        return acc + quantity * unitPrice;
      }, 0);

      const newTotalQuantity = exitingOrder.totalQuantity + addedQuantity;
      const newTotalPriceBeforeDiscount = exitingOrder.totalPriceBeforeDiscount + addedPrice;
      const newTotalPriceAfterDiscount = exitingOrder.totalPriceAfterDiscount + addedPrice;
      const newAmountToPay = exitingOrder.amountToPay + addedPrice;

      const newOrderItems = [...exitingOrderItems, ...orderItems];

      const orderData: UpdateOrderFirestoreData = {
        totalQuantity: newTotalQuantity,
        totalPriceBeforeDiscount: newTotalPriceBeforeDiscount,
        totalPriceAfterDiscount: newTotalPriceAfterDiscount,
        amountToPay: newAmountToPay,
        orderItems: newOrderItems,
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData });
      if (decrementProductStock) {
        for (let i = 0; i < orderItems.length; i++) {
          const item = orderItems[i];
          const { productId, quantity } = item;
          const productFirestoreData: UpdateProductFirestoreData = {
            stock: increment(-quantity),
            updatedAt: serverTimestamp(),
          };
          await updateProduct({ productId, productFirestoreData });
        }
      }
      toastSuccess('added');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const refundApplication = async ({ formData, images, orderId, queryCode }: RefundApplicationParameters) => {
    if (images.length > 3) {
      setError('maximum3ImagesAllowed');
      return false;
    }
    setIsWriting(true);
    setError(undefined);
    try {
      await applyForRefund({ formData, images, orderId, queryCode });
      toastSuccess('submitted');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const refundByStripe = async ({ orderId, order, formData }: RefundByStripeParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const filteredFormData = removeEmptyFieldFormObject(formData);
      const { message, referenceNumber, referenceUrl, refundAmount } = filteredFormData;
      const { data } = await refundProcess({
        orderId,
        order,
        amount: refundAmount,
        message,
        referenceNumber,
        referenceUrl,
      });
      return data.success;
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
        setError(error.message);
        return false;
      }
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const refundByOtherMethod = async ({ images, formData, orderId, order }: RefundByOtherMethodParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const filteredFormData = removeEmptyFieldFormObject(formData);
      const { message, referenceNumber, referenceUrl, refundAmount } = filteredFormData;
      const orderData = order ?? (await getOrder(orderId));
      if (!orderData) {
        throw new Error();
      }
      const amount = refundAmount === 'all' ? orderData?.amountToPay : refundAmount;
      if (amount > orderData.amountToPay) {
        throw new Error('refundAmountShallBeSmallerThanTheOrderAmount.');
      }
      const imagesData = await handleImagesUpload(`/images/orders/${orderId}`, images, 'Proof of refund');
      const filteredData = removeEmptyFieldFormObject(formData);
      const updatedStatus: UpdateStatusHistoryStatusFirestoreData = {
        ...filteredData,
        id: crypto.randomUUID(),
        status: 'Refunded',
        message,
        referenceNumber,
        referenceUrl,
        images: imagesData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const updatedOrderData: UpdateOrderFirestoreData = {
        status: 'Refunded',
        amountRefunded: arrayUnion(amount),
        statusHistories: arrayUnion(updatedStatus),
        updatedAt: serverTimestamp(),
      };
      await updateOrder({ orderId, orderData: updatedOrderData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      if (error instanceof Error && error.toString().includes('refundAmountShallBeSmallerThanTheOrderAmount')) {
        toastError(error.message);
        setError(error.message);
        return false;
      }
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return {
    order,
    loadOrder,
    loadOrderByIdAndQueryCode,
    orders,
    loadOrders,
    error,
    isLoading,
    isWriting,
    updateOrderStatus,
    removeOrderStatusHistory,
    updateOrderInformation,
    removeItemFromOrder,
    removeItemsFromOrder,
    addItemToOrder,
    addItemsToOrder,
    refundApplication,
    refundByStripe,
    refundByOtherMethod,
  };
};
