import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import LoadSmartBars from '@/components/layout/smartBar/LoadSmartBars';
import { Suspense } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="max-h-screen h-full overflow-hidden flex flex-col">
      <Suspense>
        <LoadSmartBars />
      </Suspense>
      <Header />
      <div className="relative max-w-full flex-1 h-full scrollbar overflow-y-auto">
        <div className="min-h-screen">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
