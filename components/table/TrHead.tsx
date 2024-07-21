interface TrHeadProps {
  children: React.ReactNode;
}
const TrHead = ({ children }: TrHeadProps) => {
  return <tr className="border-y border-slate-900/10 bg-gray-50/50">{children}</tr>;
};
export default TrHead;
