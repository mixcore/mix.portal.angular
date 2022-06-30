import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum AppEvent {
  NewModuleAdded = 'NewModuleAdded',
  NewPageAdded = 'NewPageAdded',
  NewPostAdded = 'NewPostAdded'
}

@Injectable({ providedIn: 'root' })
export class AppEventService {
  public event$: Subject<AppEvent> = new Subject();

  public notify(event: AppEvent): void {
    this.event$.next(event);
  }
}
