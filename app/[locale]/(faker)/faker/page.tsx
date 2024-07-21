import { Metadata } from 'next';
import FakerForm from '../components/FakerForm';
import Widget from '@/components/layout/container/Widget';

interface FakerPageProps {}

export const metadata: Metadata = {
  title: 'Faker !!Dangerous!!',
};

const FakerPage = ({}: FakerPageProps) => {
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <Widget className="max-w-screen-lg w-full p-16">
        <FakerForm />
      </Widget>
    </div>
  );
};

export default FakerPage;
