import { MixContentStatus } from '../mix-status.model';

export interface PortalMenu {
  title: string;
  icon: string;
  path: string;
  id: number;
  status: MixContentStatus;
  role: string;
  portalMenuId?: number;
  iconColor?: string;
  childMenu?: PortalMenu[];
}
