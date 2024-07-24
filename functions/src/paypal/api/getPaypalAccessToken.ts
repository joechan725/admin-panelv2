import { paypalClientId, paypalClientSecret, paypalOAuthUrl } from '../config';

interface PayPalAccessTokenResponse {
  access_token: string;
}

export const getPaypalAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64');
  const response = await fetch(paypalOAuthUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data: PayPalAccessTokenResponse = await response.json();
  return data.access_token;
};
