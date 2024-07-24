import { companyName } from '../../../general';
import { getHtmlTemplate } from '../../../lib/helpers/html/getHtmlTemplate';
import combineFNameAndLName from '../../../lib/helpers/string/combineFNameAndLName';
import { sendEmail } from '../../../lib/services/email/sendEmail';
import { Email } from '../../../models/email/Email';
import { OrderData } from '../../../models/order/OrderData';

interface SendOrderConfirmationEmailParameters {
  orderId: string;
  orderData: OrderData;
}

export const sendOrderConfirmationEmail = async ({ orderId, orderData }: SendOrderConfirmationEmailParameters) => {
  try {
    const { amountToPay, totalQuantity, userFirstName, userLastName, userEmail, queryCode } = orderData;

    if (!userEmail) {
      return;
    }

    const subject = `Order Confirmation - ${orderId}`;
    const orderUrl = `${process.env.HOST}/orders/${orderId}`;

    const htmlVariableReplacements = {
      orderId,
      customerName: combineFNameAndLName({
        firstName: userFirstName,
        lastName: userLastName,
        fallbackName: 'Customer',
      }),
      totalQuantity: totalQuantity.toString(),
      amountToPay: amountToPay.toFixed(2),
      orderUrl,
      queryCode,
      companyName,
    };

    const html = getHtmlTemplate('order confirmation', htmlVariableReplacements);
    const email: Email = {
      to: [userEmail],
      message: {
        subject,
        html,
      },
    };
    await sendEmail({ email });
  } catch (error) {
    console.error('Error sending order confirmation email');
  }
};
