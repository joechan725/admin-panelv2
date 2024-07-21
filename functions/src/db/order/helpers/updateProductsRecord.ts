import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { PrivateProduct } from '../../../models/product/PrivateProduct';
import { OrderData } from '../../../models/order/OrderData';
import { SalesRecord } from '../../../models/salesRecord/SalesRecord';
import { removeEmptyFieldFormObject } from '../../../lib/helpers/object/removeEmptyFieldFormObject';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { PrivateBrand } from '../../../models/classification/brand/PrivateBrand';
import { PrivateCollection } from '../../../models/classification/collection/PrivateCollection';
import { PrivateCategory } from '../../../models/classification/category/PrivateCategory';

interface UpdateProductsRecordParameters {
  orderId: string;
  orderData: OrderData;
  mode: 'create' | 'delete';
}

/**
 * Update the stock in product document
 * Also Update the stock, revenue and sales in private product document
 *
 * @param orderId - The order data
 * @param orderData - The order data
 * @param mode - 'create' | 'delete'
 * @returns The promise of void
 */

export const updateProductsRecord = async ({ orderId, orderData, mode }: UpdateProductsRecordParameters) => {
  try {
    const {
      userId,
      userRole,
      userAvatar,
      userEmail,
      userFirstName,
      userLastName,
      totalPriceAfterDiscount,
      totalPriceBeforeDiscount,
      amountToPay,
      createdAt,
      orderItems,
    } = orderData;

    const bigBatch = new BigBatch(db);
    if (mode === 'create') {
      orderItems.forEach((orderItem) => {
        const {
          productId,
          nameEN,
          nameZH,
          descriptionZH,
          descriptionEN,
          image,
          markedPrice,
          sellingPrice,
          brandId,
          brandNameZH,
          brandNameEN,
          categoryId,
          categoryNameZH,
          categoryNameEN,
          collectionId,
          collectionNameZH,
          collectionNameEN,
          quantity,
        } = orderItem;

        // Update the product
        const productRef = db.collection('products').doc(productId);
        const updatedProduct: ExtendWithFieldValue<Partial<PrivateProduct>> = {
          stock: FieldValue.increment(-quantity),
          revenue: FieldValue.increment(sellingPrice ?? markedPrice),
          sales: FieldValue.increment(quantity),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(productRef, updatedProduct);

        if (brandId) {
          // Update the brand
          const brandRef = db.collection('brands').doc(brandId);
          const updatedBrand: ExtendWithFieldValue<Partial<PrivateBrand>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(brandRef, updatedBrand);
        }
        if (collectionId) {
          // Update the collection
          const collectionRef = db.collection('collections').doc(collectionId);
          const updatedCollection: ExtendWithFieldValue<Partial<PrivateCollection>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(collectionRef, updatedCollection);
        }
        if (categoryId) {
          // Update the category
          const categoryRef = db.collection('categories').doc(categoryId);
          const updatedCategory: ExtendWithFieldValue<Partial<PrivateCategory>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(categoryRef, updatedCategory);
        }

        // Add a new sales record
        const productSalesRecordRef = db.collection('salesRecords').doc();
        const productSalesRecord: ExtendWithFieldValue<Omit<SalesRecord, 'id'>> = removeEmptyFieldFormObject({
          // product information
          productId,
          productNameZH: nameZH,
          productNameEN: nameEN,
          productDescriptionZH: descriptionZH,
          productDescriptionEN: descriptionEN,
          productImage: image,
          // brand information
          brandId,
          brandNameZH,
          brandNameEN,
          // category information
          categoryId,
          categoryNameZH,
          categoryNameEN,
          // collection information
          collectionId,
          collectionNameZH,
          collectionNameEN,
          // user information
          userId,
          userRole,
          userAvatar,
          userEmail,
          userFirstName,
          userLastName,
          // order information
          orderId,
          orderTotalPriceAfterDiscount: totalPriceAfterDiscount,
          orderTotalPriceBeforeDiscount: totalPriceBeforeDiscount,
          orderAmountToPay: amountToPay,
          // order sales
          sales: quantity,
          revenue: sellingPrice ?? markedPrice,
          // Timestamp
          soldAt: Timestamp.fromMillis(createdAt.toMillis()),
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
        bigBatch.create(productSalesRecordRef, productSalesRecord);
      });
    }

    if (mode === 'delete') {
      for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        const { productId, markedPrice, sellingPrice, brandId, collectionId, categoryId, quantity } = orderItem;

        // Update the product
        const productRef = db.collection('products').doc(productId);
        const updatedProduct: ExtendWithFieldValue<Partial<PrivateProduct>> = {
          revenue: FieldValue.increment(-(sellingPrice ?? markedPrice)),
          sales: FieldValue.increment(-quantity),
          updatedAt: FieldValue.serverTimestamp(),
        };
        bigBatch.update(productRef, updatedProduct);

        if (brandId) {
          // Update the brand
          const brandRef = db.collection('brands').doc(brandId);
          const updatedBrand: ExtendWithFieldValue<Partial<PrivateBrand>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(brandRef, updatedBrand);
        }
        if (collectionId) {
          // Update the collection
          const collectionRef = db.collection('collections').doc(collectionId);
          const updatedCollection: ExtendWithFieldValue<Partial<PrivateCollection>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(collectionRef, updatedCollection);
        }
        if (categoryId) {
          // Update the category
          const categoryRef = db.collection('categories').doc(categoryId);
          const updatedCategory: ExtendWithFieldValue<Partial<PrivateCategory>> = {
            revenue: FieldValue.increment(sellingPrice ?? markedPrice),
            sales: FieldValue.increment(quantity),
            updatedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(categoryRef, updatedCategory);
        }

        // Delete the sales record
        const productSalesRecordsRef = db.collection('salesRecords');
        const productSalesRecordsQuery = productSalesRecordsRef.where('orderId', '==', orderId).limit(1);
        const productSalesRecordsSnap = await productSalesRecordsQuery.get();
        const productSalesRecordRef = productSalesRecordsSnap.docs.at(0)?.ref;
        if (productSalesRecordRef) {
          const productSalesRecord: Partial<ExtendWithFieldValue<Omit<SalesRecord, 'id'>>> = {
            deletedAt: FieldValue.serverTimestamp(),
          };
          bigBatch.update(productSalesRecordRef, productSalesRecord);
        }
      }
    }
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating product record', error);
  }
};
