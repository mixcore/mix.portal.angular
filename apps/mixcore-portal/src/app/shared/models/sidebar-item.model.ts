export interface MenuItem {
  title?: string;
  icon?: string;
  active?: boolean;
  actions?: ItemAction[];
}

export interface ItemAction {
  title?: string;
  icon?: string;
  action?: () => void;
}
