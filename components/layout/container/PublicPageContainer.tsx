interface PublicPageContainerProps {
  children?: React.ReactNode;
}

const PublicPageContainer = ({ children }: PublicPageContainerProps) => {
  return <div className="max-w-screen-2xl mx-auto px-4 mt-4 mb-16">{children}</div>;
};

export default PublicPageContainer;
