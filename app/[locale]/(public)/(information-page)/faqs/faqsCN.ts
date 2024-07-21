import { PlainTextBlock } from '@/models/content/PlainTextBlock';

export const faqsCN: PlainTextBlock[] = [
  {
    type: 'PlainText',
    title: '常見問題（FAQs）',
  },
  {
    type: 'PlainText',
    title: '1. 訂單',
    subContentBlocks: [
      {
        subTitle: '1.1 如何下訂單？',
        content:
          '要下訂單，只需瀏覽我們的產品，選擇您想購買的商品，將它們加入購物車，然後進行結帳。按照屏幕上的指示完成您的購買。',
      },
      {
        subTitle: '1.2 我可以取消訂單嗎？',
        content: '是的，您可以在下訂單後的24小時內取消訂單。請儘快聯繫我們的客服團隊並提供您的訂單詳情。',
      },
      {
        subTitle: '1.2 我如何追蹤我的訂單？',
        content: '你可以登陸帳號，然後在「我的訂單」查看訂單詳情。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '2. 運送',
    subContentBlocks: [
      {
        subTitle: '2.1 你們提供哪些運送方式？',
        content: '你可以在「運送方式」頁面查看所有運送方式。',
        href: '/shipping-methods',
        linkDescription: '詳細請按這裏。',
      },
      {
        subTitle: '2.2 我需要多久才能收到我的訂單',
        content: '你可以在「運送方式」頁面查看運送方式的所需時間。',
        href: '/shipping-methods',
        linkDescription: '詳細請按這裏。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '3. 退換貨',
    subContentBlocks: [
      {
        subTitle: '3.1 你們的退貨政策是什麼？',
        content: '我們提供14天的退貨政策。大多數商品必須以原狀和包裝退回。請訪問我們的「退換貨政策」頁面了解更多詳情。',
        href: '/return-and-exchange-policy',
        linkDescription: '詳細請按這裏。',
      },
      {
        subTitle: '3.2 如何退貨？',
        content:
          '要退貨，請訪問我們的退換貨頁面並按照提供的指示進行操作。您需要您的訂單號和下訂單時使用的電子郵件地址。',
      },
      {
        subTitle: '3.3 我可以換貨嗎？',
        content: '是的，30天內可交換價值相等或較低的商品。請聯繫我們的客服團隊以開始換貨流程。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '4. 付款',
    subContentBlocks: [
      {
        subTitle: '4.1 你們接受哪些付款方式？',
        content: '我們接受主要信用卡（Visa、MasterCard）、PayPal及其他安全付款方式。可用的選項將在結帳時顯示。',
      },
      {
        subTitle: '4.2 我的付款信息是否安全？',
        content: '是的，我們使用業界標準的加密和安全支付網關來確保您的付款信息得到保護。',
      },
      {
        subTitle: '4.3 什麼時候會收取我的訂單費用？',
        content: '您在購買時將被收取費用。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '5. 產品',
    subContentBlocks: [
      {
        subTitle: '5.1 我如何選擇合適的尺寸？',
        content: '請參考我們的尺寸指南以獲取詳細的尺寸信息。如果您仍然不確定，請聯繫我們的客服團隊尋求幫助。',
      },
      {
        subTitle: '5.2 產品顏色是否準確？',
        content: '我們盡一切努力準確顯示產品顏色。然而，由於不同顯示器設置，實際顏色可能略有不同。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '6. 其他',
    subContentBlocks: [
      {
        subTitle: '6.1 我如何聯繫客服？',
        content: '你可以在「聯絡我們」頁面找到我們的聯絡方法。',
        href: '/contact-us',
        linkDescription: '詳細請按這裏。',
      },
    ],
  },
];
