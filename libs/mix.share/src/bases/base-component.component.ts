import { inject } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

export abstract class BaseComponent {
  public alert = inject(TuiAlertService);

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
