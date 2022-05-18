import { BehaviorSubject } from 'rxjs';

export class SidebarMenuService {
  public isExpanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
