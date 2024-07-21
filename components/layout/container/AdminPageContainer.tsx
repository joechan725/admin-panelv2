interface AdminPageContainerProps {
  children?: React.ReactNode;
}

const AdminPageContainer = ({ children }: AdminPageContainerProps) => {
  return <div className="max-w-screen-2xl w-full mb-20 mt-5">{children}</div>;
};

export default AdminPageContainer;
