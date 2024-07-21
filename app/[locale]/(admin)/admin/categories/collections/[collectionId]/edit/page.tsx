import { Metadata } from 'next';
import EditCollectionModal from '../../../components/collection/modal/EditCollectionModal';
import { unstable_setRequestLocale } from 'next-intl/server';

interface EditCollectionProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Edit a collection',
};

const EditCollection = ({ params: { locale } }: EditCollectionProps) => {
  unstable_setRequestLocale(locale);

  return <EditCollectionModal />;
};
export default EditCollection;
