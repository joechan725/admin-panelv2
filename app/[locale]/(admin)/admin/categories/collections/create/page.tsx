import { Metadata } from 'next';
import CreateCollectionModal from '../../components/collection/modal/CreateCollectionModal';
import { unstable_setRequestLocale } from 'next-intl/server';

interface CreateCollectionProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Create a new collection',
};

const CreateCollection = ({ params: { locale } }: CreateCollectionProps) => {
  unstable_setRequestLocale(locale);

  return <CreateCollectionModal />;
};
export default CreateCollection;
