import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

export abstract class BaseComponent {
  public alert = inject(TuiAlertService);
  public route = inject(Router);

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
