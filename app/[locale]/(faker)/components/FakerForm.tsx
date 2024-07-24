'use client';

import BoxButton from '@/components/form/BoxButton';
import RollerInput from '@/components/form/RollerInput';
import { useState } from 'react';
import { addFakeBrands } from '../api/classification/brand/addFakeBrands';
import { addFakeCollections } from '../api/classification/collection/addFakeCollections';
import { addFakeCategories } from '../api/classification/category/addFakeCategories';
import { addFakeCoupons } from '../api/coupon/addFakeCoupon';
import { addFakeStoreAddresses } from '../api/storeAddress/addFakeStoreAddresses';
import { addFakeDeliveryOptions } from '../api/deliveryOption/addFakeDeliveryOptions';
import { addFakeSmartBars } from '../api/smartBar/addFakeSmartBars';
import { addFakeProducts } from '../api/product/addFakeProducts';
import { addFakeUsers } from '../api/user/addFakeUsers';
import { addFakeAddresses } from '../api/user/address/addFakeAddresses';
import { addFakeCartItems } from '../api/user/cartItem/addFakeCartItems';
import ErrorMessage from '@/components/form/ErrorMessage';
import { addFakeComments } from '../api/comment/addFakeComments';
import toast from 'react-hot-toast';
import { addFakeOrders } from '../api/order/addFakeOrders';
import { addFakeStoreInformation } from '../api/storeInformation/addFakeStoreInformation';
import { addFakeWishlistItems } from '../api/user/wishlistItem/addFakeWishlistItems';
import { addFakeReplies } from '../api/reply/addFakeReplies';
import { addFakePromotions } from '../api/promotion/addFakePromotions';

interface FakerFormProps {}

const FakerForm = ({}: FakerFormProps) => {
  const [numberOfBrands, setNumberOfBrands] = useState(5);
  const [numberOfCollections, setNumberOfCollections] = useState(5);
  const [numberOfCategories, setNumberOfCategories] = useState(5);
  const [numberOfCoupons, setNumberOfCoupons] = useState(10);
  const [numberOfStoreAddresses, setNumberOfStoreAddresses] = useState(3);
  const [numberOfDeliveryOptions, setNumberOfDeliveryOptions] = useState(10);
  const [numberOfSmartBars, setNumberOfSmartBars] = useState(5);
  const [numberOfProducts, setNumberOfProducts] = useState(1000);
  const [numberOfPromotions, setNumberOfPromotions] = useState(50);
  const [numberOfUsers, setNumberOfUsers] = useState(250);
  const [maxNumberOfAddresses, setMaxNumberOfAddresses] = useState(3);
  const [maxNumberOfCartItems, setMaxNumberOfCartItems] = useState(3);
  const [maxNumberOfWishlistItems, setMaxNumberOfWishlistItems] = useState(3);
  const [numberOfOrders, setNumberOfOrders] = useState(150);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      await addFakeBrands(numberOfBrands);
      await addFakeCollections(numberOfCollections);
      await addFakeCategories(numberOfCategories);
      await addFakeCoupons(numberOfCoupons);
      await addFakeStoreAddresses(numberOfStoreAddresses);
      await addFakeDeliveryOptions(numberOfDeliveryOptions);
      await addFakeSmartBars(numberOfSmartBars);
      await addFakeProducts(numberOfProducts);
      await addFakeUsers(numberOfUsers);
      const ids = await addFakeOrders(numberOfOrders);
      await addFakeComments(ids);
      await addFakeReplies(ids);
      await addFakeAddresses(maxNumberOfAddresses);
      await addFakeCartItems(maxNumberOfCartItems);
      await addFakeWishlistItems(maxNumberOfWishlistItems);
      await addFakeStoreInformation();
      await addFakePromotions(numberOfPromotions);
      toast.success('Success');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.toString());
        toast.error(error.toString());
        return;
      }
      setError('Unexpected error. Please try again later.');
      toast.error('Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center text-2xl font-semibold text-primary-text">你好，世界！</div>
      <div className="space-y-1">
        <div className="text-center text-lg font-semibold text-danger">
          Dangerous!! If you see this page on your website, please inform your IT technician immediately!! And please do
          not click any button on this page!!
        </div>
        <div className="text-center text-lg font-semibold text-danger">
          危險的！如果您在網站上看到此頁面，請立即通知您的 IT 技術人員！請不要點擊此頁面上的任何按鈕！
        </div>
        <div className="text-center text-lg font-semibold text-danger">
          危険です!! Web サイトでこのページが表示された場合は、すぐに IT
          技術者に知らせてください。このページのボタンを押しないでください!!
        </div>
      </div>
      <div className="flex justify-end">
        <BoxButton theme="primary" disabled={isLoading} type="button" fontSize="sm" onClick={handleGenerate}>
          Generate
        </BoxButton>
      </div>
      <ErrorMessage error={error} align="right" />
      <div className="grid grid-cols-2 gap-16">
        <div>
          <RollerInput
            title="Brands"
            lowestValue={0}
            highestValue={10}
            setValue={setNumberOfBrands}
            value={numberOfBrands}
          />
          <RollerInput
            title="Collections"
            lowestValue={0}
            highestValue={10}
            setValue={setNumberOfCollections}
            value={numberOfCollections}
          />
          <RollerInput
            title="Categories"
            lowestValue={0}
            highestValue={10}
            setValue={setNumberOfCategories}
            value={numberOfCategories}
          />
          <RollerInput
            title="Users"
            lowestValue={0}
            highestValue={1000}
            setValue={setNumberOfUsers}
            value={numberOfUsers}
          />
          <RollerInput
            title="Max addresses per user"
            lowestValue={0}
            highestValue={10}
            setValue={setMaxNumberOfAddresses}
            value={maxNumberOfAddresses}
          />
          <RollerInput
            title="Product"
            lowestValue={0}
            highestValue={2000}
            setValue={setNumberOfProducts}
            value={numberOfProducts}
          />
          <RollerInput
            title="Promotion"
            lowestValue={0}
            highestValue={100}
            setValue={setNumberOfPromotions}
            value={numberOfPromotions}
          />
        </div>
        <div>
          <RollerInput
            title="Coupons"
            lowestValue={0}
            highestValue={20}
            setValue={setNumberOfCoupons}
            value={numberOfCoupons}
          />
          <RollerInput
            title="Store addresses"
            lowestValue={0}
            highestValue={5}
            setValue={setNumberOfStoreAddresses}
            value={numberOfStoreAddresses}
          />
          <RollerInput
            title="Delivery options"
            lowestValue={0}
            highestValue={20}
            setValue={setNumberOfDeliveryOptions}
            value={numberOfDeliveryOptions}
          />
          <RollerInput
            title="Smart bars"
            lowestValue={0}
            highestValue={10}
            setValue={setNumberOfSmartBars}
            value={numberOfSmartBars}
          />
          <RollerInput
            title="Max cart items per user"
            lowestValue={0}
            highestValue={20}
            setValue={setMaxNumberOfCartItems}
            value={maxNumberOfCartItems}
          />
          <RollerInput
            title="Max wishlist items per user"
            lowestValue={0}
            highestValue={20}
            setValue={setMaxNumberOfWishlistItems}
            value={maxNumberOfWishlistItems}
          />
          <RollerInput
            title="Orders"
            lowestValue={0}
            highestValue={1000}
            setValue={setNumberOfOrders}
            value={numberOfOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default FakerForm;
