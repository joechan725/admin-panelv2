import { Client, GatewayIntentBits } from 'discord.js';
import { OrderData } from '../../../models/order/OrderData';
import combineFNameAndLName from '../../../lib/helpers/string/combineFNameAndLName';

interface SendOrderMessageToDiscordParameters {
  orderId: string;
  orderData: OrderData;
  status: OrderData['status'];
}

export const sendOrderMessageToDiscord = async ({
  orderId,
  orderData,
  status,
}: SendOrderMessageToDiscordParameters) => {
  if (status !== 'Paid' && status !== 'Application for Refund') {
    return;
  }

  let message = '';
  const divider = '------------------------------';

  const { userFirstName, userLastName, totalQuantity, amountToPay, orderItems } = orderData;

  const userFullName = combineFNameAndLName({
    firstName: userFirstName,
    lastName: userLastName,
    fallbackName: '匿名用戶',
  });

  if (status === 'Paid') {
    const orderItemsMessage = orderItems.reduce((acc, orderItem, index) => {
      const { nameZH, quantity } = orderItem;
      return acc + `${index + 1}. ${nameZH} (${quantity}件)\n`;
    }, '');

    message = `${divider}\n新訂單 #${orderId}\n${divider}\n${userFullName} 下了一張訂單\n${divider}\n${orderItemsMessage}${divider}\n共${totalQuantity}件產品\n總金額為$${amountToPay}\n${divider}`;
  }

  if (status === 'Application for Refund') {
    message = `${divider}\n申請退款 #${orderId}\n${divider}\n${userFullName} 已提出退款申請。\n${divider}`;
  }

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', () => {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID as string);
    if (channel && channel.isTextBased()) {
      channel.send(message);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};
