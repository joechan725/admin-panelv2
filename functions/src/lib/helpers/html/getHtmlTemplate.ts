const orderConfirmationTemplate = `
<div style="width: 100%; background-color: #f6f6f6; padding-top: 16px; padding-bottom: 16px">
  <div style="max-width: 600px; width: 100%; background-color: white; border-radius: 8px; margin: auto; padding: 40px; border: 1px solid rgba(15, 23, 42, 0.2); font-family: Arial, sans-serif; line-height: 1;">
    <h2 style="color: #333">Order Confirmation</h2>
    <p>Hi {{customerName}},</p>
    <p>Thank you for your order!</p>
    <p>
      Your order
      <strong><a href="{{orderUrl}}" style="color: #0ea5e9; text-decoration: none"> #{{orderId}}</a></strong> has been
      placed!
    </p>
    <p>Query code: <strong>{{queryCode}}</strong></p>
    <p>We recommended you to save the id and query code.</p>
    <p>We will process your order for delivery as soon as possible.</p>
    <p>
      A total of <strong>{{totalQuantity}}</strong> items and a total of $<strong>{{amountToPay}}</strong>.
    </p>
    <p>
      You can view your order details
      <strong>
        <a href="{{orderUrl}}" style="color: #0ea5e9; text-decoration: none"> here</a>
      </strong>
    </p>
    <p>
      <span>Or use the url here: </span>
      <a href="{{orderUrl}}" style="color: #0ea5e9; font-weight: normal; text-decoration: underline">
        {{orderUrl}}
      </a>
    </p>
    <p>Thank you for shopping with us!</p>
    <p>Best regards,</p>
    <p>{{companyName}}</p>
  </div>
</div>
`;

const backInStockTemplate = `
<div style="width: 100%; background-color: #f6f6f6; padding-top: 16px; padding-bottom: 16px">
  <div style="max-width: 600px; width: 100%; background-color: white; border-radius: 8px; margin: auto; padding: 40px; border: 1px solid rgba(15, 23, 42, 0.2); font-family: Arial, sans-serif; line-height: 1.5;">
    <h2 style="color: #333">Good News!</h2>
    <p>The product <strong>{{productName}}</strong> is back in stock.</p>
    <p>
      <a href="{{productUrl}}" style="color: #ffffff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: small; white-space: nowrap;">
        Click here to visit the product page
      </a>
    </p>
    <p>
      <span>Or use the url here: </span>
      <a href="{{productUrl}}" style="color: #0ea5e9; font-weight: normal; text-decoration: underline">
        {{productUrl}}
      </a>
    </p>
    <img src="{{imageUrl}}" alt="{{imageAlt}}" style="max-width: 100%; height: auto" />
    <p>Thank you for shopping with us!</p>
    <p>Best regards,</p>
    <p>{{companyName}}</p>
  </div>
</div>
`;

export const getHtmlTemplate = (
  template: 'order confirmation' | 'back in stock',
  replacements: { [key: string]: string }
) => {
  let html = '';
  if (template === 'order confirmation') {
    html = orderConfirmationTemplate;
  }
  if (template === 'back in stock') {
    html = backInStockTemplate;
  }
  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, replacements[key]);
  }
  return html;
};
