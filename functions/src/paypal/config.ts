export const paypalApiUrl = process.env.PAYPAL_API_URL;
export const paypalVerifyUrl = `${paypalApiUrl}/v1/notifications/verify-webhook-signature`;
export const paypalOAuthUrl = `${paypalApiUrl}/v1/oauth2/token`;
export const paypalCreateOrderUrl = `${paypalApiUrl}/v2/checkout/orders`;

export const webhookId = process.env.PAYPAL_WEBHOOK_ID;
export const paypalClientId = process.env.PAYPAL_CLIENT_ID;
export const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;
