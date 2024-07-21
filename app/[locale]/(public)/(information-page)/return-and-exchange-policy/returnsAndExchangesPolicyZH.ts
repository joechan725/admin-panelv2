import { ContentBlock } from '@/models/content/ContentBlock';
import { PlainTextBlock } from '@/models/content/PlainTextBlock';

export const returnsAndExchangesPolicyZH: PlainTextBlock[] = [
  {
    type: 'PlainText',
    title: '退換貨政策',
    content: '退換貨政策是為了保護您的權益和提供良好的購物體驗而制定的。請在購買前仔細閱讀並理解以下的退換貨政策。',
  },
  {
    type: 'PlainText',
    title: '1. 退換貨範圍',
    subContentBlocks: [
      {
        subTitle: '1.1 退貨',
        content:
          '如果您收到的商品存在質量問題或與您在訂單中所選擇的商品不符，您可以在收到商品後的 7 天內提出退貨要求。',
      },
      {
        subTitle: '1.2 換貨',
        content:
          '如果您需要更換尺寸、顏色或其他相同商品的變體，您可以在收到商品後的 7 天內提出換貨要求。換貨商品必須保持原樣，未經使用、未損壞且包裝完好。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '2. 退換貨流程',
    subContentBlocks: [
      {
        subTitle: '2.1 申請',
        content:
          '請在退換貨前聯繫我們的客戶服務團隊，並提供訂單號碼、產品信息和退換貨原因。我們的客戶服務團隊將為您提供詳細的退換貨指南。',
      },
      {
        subTitle: '2.2 運送',
        content:
          '在確認您的退換貨要求後，請按照我們的指示將商品寄回。退貨時，請確保商品完好無損且包裝完好，並附上退貨原因和訂單信息。',
      },
      {
        subTitle: '2.3 處理',
        content:
          '當我們收到退換貨商品並驗證其符合退換貨政策的條件後，我們將進行退款或換貨處理。退款將按照您原始的付款方式進行退回，換貨將在確認換貨商品的庫存後安排發送。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '3. 退換貨注意事項',
    subContentBlocks: [
      {
        subTitle: '3.1 條件',
        content:
          '退換貨商品必須保持原樣，未經使用、未損壞且包裝完好。如果商品有任何損壞或使用痕跡，我們將無法接受退換貨要求。',
      },
      {
        subTitle: '3.2 資格',
        content:
          '部分商品可能不適用於退換貨政策，例如個人衛生用品或特殊定制商品。請在購買前仔細查看商品頁面上的退換貨相關信息。',
      },
      {
        subTitle: '3.3 運費',
        content:
          '退換貨運費：如果退換貨是因為商品質量問題或我們的錯誤導致，我們將承擔退換貨的運費。如果是因為您的個人原因（如尺寸不合適或喜好不符等），您可能需要自行承擔退換貨的運費。',
      },
    ],
  },
  {
    type: 'PlainText',
    title: '4. 退換貨政策變更',
    content:
      '我們保留隨時修改退換貨政策的權利。任何修改將在我們的網站上公布，並自公布之日起生效。對於已經提交的退換貨要求，將按照當時的政策進行處理。',
  },
  {
    type: 'PlainText',
    content: '如果您對退換貨政策有任何疑問或需要進一步的幫助，請聯繫我們的客戶服務團隊。',
  },
];
