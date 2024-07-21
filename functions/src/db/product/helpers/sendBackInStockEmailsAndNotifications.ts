import { ProductData } from '../../../models/product/ProductData';
import { SubscriberListData } from '../../../models/product/other/SubscriberListData';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { SubscriberList } from '../../../models/product/other/SubscriberList';
import { FieldValue } from 'firebase-admin/firestore';
import { Notification } from '../../../models/user/notification/Notification';
import { getHtmlTemplate } from '../../../lib/helpers/html/getHtmlTemplate';
import { sendEmail } from '../../../lib/services/email/sendEmail';
import { Email } from '../../../models/email/Email';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { companyName } from '../../../general';

interface SendBackInStockEmailsAndNotificationsParameters {
  productData: ProductData;
  productId: string;
}

/**
 * Get the subscribers of the products,
 * send the back to stock notifications,
 * create the in-site notification to the users,
 * and empty the subscribers of the products.
 *
 * @param productId the id of the product
 * @param productData the data of the product
 */

export const sendBackInStockEmailsAndNotifications = async ({
  productData,
  productId,
}: SendBackInStockEmailsAndNotificationsParameters) => {
  try {
    const subscriberListRef = db.collection('products').doc(productId).collection('others').doc('subscriberList');

    const subscriberListSnap = await subscriberListRef.get();
    const subscriberListData = subscriberListSnap.data() as SubscriberListData;
    const subscriberEmails = subscriberListData.subscribers.map((subscriber) => subscriber.email);
    const subscriberUserIds = subscriberListData.subscribers.map((subscriber) => subscriber.userId);

    const { nameEN, images } = productData;

    // Send the back in Stock email
    const subject = `Product Back in Stock: ${nameEN}`;
    const productUrl = `${process.env.HOST}/products/${productId}`;
    const htmlVariableReplacements = {
      productUrl,
      productName: nameEN,
      imageUrl: images?.[0]?.url ?? '',
      imageAlt: images?.[0]?.alt ?? '',
      companyName,
    };
    const html = getHtmlTemplate('back in stock', htmlVariableReplacements);
    const email: Email = {
      to: subscriberEmails,
      message: {
        subject,
        html,
      },
    };
    await sendEmail({ email });

    const bigBatch = new BigBatch(db);
    subscriberUserIds.forEach((userId) => {
      const userNotificationRef = db.collection('users').doc(userId).collection('notifications').doc();
      const userNotificationData: ExtendWithFieldValue<Omit<Notification, 'id'>> = {
        category: 'Back in Stock',
        type: 'Back in Stock',
        imageType: 'image',
        productId,
        productName: nameEN,
        image: images?.[0],
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      bigBatch.set(userNotificationRef, userNotificationData);
    });

    const updateSubscriberList: ExtendWithFieldValue<Partial<SubscriberList>> = {
      subscribers: [],
      updatedAt: FieldValue.serverTimestamp(),
    };

    bigBatch.set(subscriberListRef, updateSubscriberList);

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on sending back in stock email', error);
  }
};
