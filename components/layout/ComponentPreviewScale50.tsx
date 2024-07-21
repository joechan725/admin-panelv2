interface ComponentPreviewScale50Props {
  children: React.ReactNode;
}

const ComponentPreviewScale50 = ({ children }: ComponentPreviewScale50Props) => {
  return <div className="w-screen scale-50 -translate-y-[25%] -translate-x-[25%]">{children}</div>;
};

export default ComponentPreviewScale50;
