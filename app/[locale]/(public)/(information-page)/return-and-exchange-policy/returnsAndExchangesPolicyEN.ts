import { PlainTextBlock } from '@/models/content/PlainTextBlock';

export const returnsAndExchangesPolicyEN: PlainTextBlock[] = [
  {
    type: 'PlainText',
    title: 'Return and Exchange Policy',
    content:
      'Our Return and Exchange Policy is designed to ensure that you are completely satisfied with your shopping experience. Before making a purchase, please take a moment to review our policy below.',
  },
  {
    type: 'PlainText',
    title: '1. Scope of Return and Exchange',
    subContentBlocks: [
      {
        subTitle: '1.1 Returns',
        content:
          'You may return a product within 7 calendar days of receipt if it has a quality issue or differs from the item ordered.',
      },
      {
        subTitle: '1.2 Exchanges',
        content:
          'Exchanges for a different size, color, or variant can be made within 7 calendar days of receipt. To be eligible, the product must remain in its original, unused condition, and the packaging must be intact.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '2. Return and Exchange Process',
    subContentBlocks: [
      {
        subTitle: '2.1 Initiation',
        content:
          'Contact our customer service at [service@example.com](mailto:service@example.com) or call us at +1 (123) 456-7890 with your order number and details about the product and the issue.',
      },
      {
        subTitle: '2.2 Shipping',
        content:
          'Follow the instructions provided by customer service to return the product. Ensure the item is well-packed and includes proof of purchase.',
      },
      {
        subTitle: '2.3 Processing',
        content:
          'Once we receive and inspect the item, we’ll process your refund or exchange. Refunds are issued to the original payment method, and exchanges are subject to stock availability.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '3. Important Notes',
    subContentBlocks: [
      {
        subTitle: '3.1 Condition',
        content:
          "We only accept returns or exchanges for products in new condition. 'New condition' means unworn, undamaged, and in the original packaging.",
      },
      {
        subTitle: '3.2 Eligibility',
        content:
          'Certain items, like personal hygiene products or custom-made orders, are not eligible for return or exchange. Check product pages for specific details.',
      },
      {
        subTitle: '3.3 Shipping Fees',
        content:
          'We cover shipping for returns/exchanges due to defects or errors. For other reasons, such as personal preference, you may be responsible for shipping costs.',
      },
      {
        subTitle: '3.4 Policy Changes',
        content:
          'We may update this policy, with changes posted on our site. These changes apply from their publication date.',
      },
    ],
  },
  {
    type: 'PlainText',
    content: 'For questions or assistance, please reach out to our customer service team.',
  },
];
