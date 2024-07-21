'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { useEffect, useState } from 'react';

interface ProductTogglePublicProps {
  privateProduct: PrivateProduct;
}

const ProductTogglePublic = ({ privateProduct }: ProductTogglePublicProps) => {
  const { toggleIsPublic, isWriting } = useProduct();
  const [isPublic, setIsPublic] = useState(privateProduct.isPublic);

  useEffect(() => {
    setIsPublic(privateProduct.isPublic);
  }, [privateProduct.isPublic]);

  const handleToggle = async () => {
    toggleIsPublic({ isPublic, setIsPublic, product: privateProduct });
  };

  return <ToggleSwitch isToggled={isPublic} onToggle={handleToggle} disabled={isWriting} theme="success" />;
};

export default ProductTogglePublic;
