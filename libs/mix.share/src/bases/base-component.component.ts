import { Directive } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Directive()
export abstract class BaseComponent {
  constructor(public alert: TuiAlertService) {}

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
