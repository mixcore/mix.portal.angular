import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, take } from 'rxjs';

import { HeaderMenuService } from '../components/header-menu/header-menu.service';

export abstract class BaseComponent {
  public alert = inject(TuiAlertService);
  public route = inject(Router);
  public header = inject(HeaderMenuService);

  public disabled$ = new BehaviorSubject<boolean>(false);
  public error$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(true);

  public showSuccess(text: string): void {
    this.alert
      .open(new Date().toLocaleString(), {
        label: text,
        status: TuiNotification.Success
      })
      .pipe(take(1))
      .subscribe();
  }

  public showError(text: string): void {
    this.alert
      .open(new Date().toLocaleString(), {
        label: text,
        status: TuiNotification.Error
      })
      .pipe(take(1))
      .subscribe();
  }
}
