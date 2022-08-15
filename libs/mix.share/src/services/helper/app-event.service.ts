import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum AppEvent {
  NewModuleAdded = 'NewModuleAdded',
  NewPageAdded = 'NewPageAdded',
  NewPostAdded = 'NewPostAdded',
  NewThemeAdded = 'NewThemeAdded',
  CreatePost = 'CreatePost',
  CreatePage = 'CreatePage',
  CreateModule = 'CreateModule',
  CreateTheme = 'CreateTheme',
  UniversalSearch = 'UniversalSearch',
  ThemeSelected = 'ThemeSelected'
}

export interface AppEventModel {
  type: AppEvent;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class AppEventService {
  public event$: Subject<AppEventModel> = new Subject();

  public notify(event: AppEventModel): void {
    this.event$.next(event);
  }

  public onSearch(): void {
    this.event$.next({ type: AppEvent.UniversalSearch });
  }
}
