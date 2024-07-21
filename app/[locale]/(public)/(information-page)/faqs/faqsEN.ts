import { ContentBlock } from '@/models/content/ContentBlock';

export const faqsEN: ContentBlock[] = [
  {
    type: 'PlainText',
    title: 'Frequently Asked Question (FAQs)',
  },
  {
    type: 'PlainText',
    title: '1. Orders',
    subContentBlocks: [
      {
        subTitle: '1.1 How to place an order?',
        content:
          'To place an order, simply browse our products, select the items you want to purchase, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.',
      },
      {
        subTitle: '1.2 Can I cancel my order?',
        content:
          'Yes, you can cancel your order within 24 hours of placing it. Please contact our customer service team as soon as possible and provide your order details.',
      },
      {
        subTitle: '1.3 How do I track my order?',
        content: 'You can log in to your account and check the order details in "My Orders".',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '2. Shipping',
    subContentBlocks: [
      {
        subTitle: '2.1 What shipping methods do you offer?',
        content: 'You can view all shipping methods on the "Shipping Methods" page.',
        href: '/shipping-methods',
        linkDescription: 'Click here for details.',
      },
      {
        subTitle: '2.2 How long will it take to receive my order?',
        content: 'You can view the delivery times for each shipping method on the "Shipping Methods" page.',
        href: '/shipping-methods',
        linkDescription: 'Click here for details.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '3. Returns and Exchanges',
    subContentBlocks: [
      {
        subTitle: '3.1 What is your return policy?',
        content:
          'We offer a 14-day return policy. Most items must be returned in their original condition and packaging. Please visit our "Return and Exchange Policy" page for more details.',
        href: '/return-and-exchange-policy',
        linkDescription: 'Click here for details.',
      },
      {
        subTitle: '3.2 How do I return an item?',
        content:
          'To return an item, please visit our return and exchange page and follow the provided instructions. You will need your order number and the email address used when placing the order.',
      },
      {
        subTitle: '3.3 Can I exchange an item?',
        content:
          'Yes, items of equal or lesser value can be exchanged within 30 days. Please contact our customer service team to initiate the exchange process.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '4. Payment',
    subContentBlocks: [
      {
        subTitle: '4.1 What payment methods do you accept?',
        content:
          'We accept major credit cards (Visa, MasterCard), PayPal, and other secure payment methods. Available options will be displayed at checkout.',
      },
      {
        subTitle: '4.2 Is my payment information secure?',
        content:
          'Yes, we use industry-standard encryption and secure payment gateways to ensure your payment information is protected.',
      },
      {
        subTitle: '4.3 When will I be charged for my order?',
        content: 'You will be charged at the time of purchase.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '5. Products',
    subContentBlocks: [
      {
        subTitle: '5.1 How do I choose the right size?',
        content:
          'Please refer to our size guide for detailed sizing information. If you are still unsure, please contact our customer service team for assistance.',
      },
      {
        subTitle: '5.2 Are the product colors accurate?',
        content:
          'We strive to display product colors accurately. However, actual colors may vary slightly due to different monitor settings.',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '6. Others',
    subContentBlocks: [
      {
        subTitle: '6.1 How do I contact customer service?',
        content: 'You can find our contact methods on the "Contact Us" page.',
        href: '/contact-us',
        linkDescription: 'Click here for details.',
      },
    ],
  },
];
