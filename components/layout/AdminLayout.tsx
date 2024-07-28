import AdminSidebar from './admin/sidebar/AdminSidebar';
import AdminHeaderSuspense from './admin/header/AdminHeaderSuspense';
import AdminPageContainer from './container/AdminPageContainer';
import ToggleAdminSideBar from './admin/sidebar/ToggleAdminSideBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="max-h-screen h-full">
      <div className="flex justify-between min-h-screen">
        <div className="flex-0 max-w-64 w-full hidden lg:block">
          <AdminSidebar />
        </div>
        <ToggleAdminSideBar />
        <div className="flex-1 max-h-screen bg-admin-bg px-8 scrollbar overflow-y-auto">
          <AdminPageContainer>
            <AdminHeaderSuspense />
            <div className="mt-8 h-full">{children}</div>
          </AdminPageContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
