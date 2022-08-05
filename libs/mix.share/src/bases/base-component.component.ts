import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

import { HeaderMenuService } from '../components/header-menu/header-menu.service';

export abstract class BaseComponent {
  public error$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(true);
  public alert = inject(TuiAlertService);
  public route = inject(Router);
  public header = inject(HeaderMenuService);

  public showSuccess(text: string): void {
    this.alert
      .open(new Date().toLocaleDateString(), {
        label: text,
        status: TuiNotification.Success
      })
      .subscribe();
  }

  public showError(text: string): void {
    this.alert
      .open(new Date().toLocaleDateString(), {
        label: text,
        status: TuiNotification.Error
      })
      .subscribe();
  }
}
