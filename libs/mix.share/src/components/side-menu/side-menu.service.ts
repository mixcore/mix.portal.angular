import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideMenuService {
  public open$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public miniSize$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
}
