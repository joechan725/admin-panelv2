interface OrDividerLineProps {
  children: React.ReactNode;
}
const OrDividerLine = ({ children }: OrDividerLineProps) => {
  return (
    <div className="flex gap-4 justify-center items-center my-8">
      <hr className="flex-1 h-0.5 bg-slate-300" />
      <div className="uppercase text-xs font-medium text-tertiary-text">{children}</div>
      <hr className="flex-1 h-0.5 bg-slate-300" />
    </div>
  );
};
export default OrDividerLine;
