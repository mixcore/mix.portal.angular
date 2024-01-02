export type MenuItem = {
  title: string;
  url: string;
  path?: string;
  icon?: string;
  iconColor?: string;
  children?: MenuItem[];
  align?: 'top' | 'bottom';
  isDevelopment?: boolean;
  default?: boolean;
};
