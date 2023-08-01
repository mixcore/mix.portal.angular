export type MenuItem = {
  title: string;
  url: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  align?: 'top' | 'bottom';
};
