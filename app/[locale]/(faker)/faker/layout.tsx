interface FakerLayoutProps {
  children: React.ReactNode;
}

const FakerLayout = ({ children }: FakerLayoutProps) => {
  return <div className="min-h-screen min-w-full bg-slate-100">{children}</div>;
};

export default FakerLayout;
