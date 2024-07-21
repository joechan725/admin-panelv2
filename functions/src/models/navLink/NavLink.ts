export interface NavLink {
  title: string;
  href: string;
  icon?: React.ReactNode;
  ending?: React.ReactNode;
  nestedNavLinks?: {
    title: string;
    href: string;
  }[];
}
