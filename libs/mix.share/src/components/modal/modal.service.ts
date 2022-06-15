import { Injectable, Provider } from '@angular/core';
import { AbstractTuiDialogService, TUI_DIALOGS } from '@taiga-ui/cdk';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends AbstractTuiDialogService<ModalOption> {
  public modalShadowColor: Record<'success' | 'error' | 'warning' | 'confirm' | 'info', string> = {
    success: '#4ac99b', //--tui-success-fill
    warning: '#ff7043', //--tui-accent-fill
    error: '#f45725', //--tui-error-fill
    confirm: '#ff7043', //--tui-accent-fill,
    info: '#70b6f6' //--tui-info-fill
  };

  public readonly defaultOptions: ModalOption = {
    heading: 'Confirm?',
    buttons: ['Yes', 'No'],
    borderShadowColor: this.modalShadowColor.confirm
  } as const;

  public readonly component: PolymorpheusComponent<ModalComponent, object> = new PolymorpheusComponent(ModalComponent);

  public show(message: string, title: string): Observable<boolean> {
    const options: ModalOption = { ...this.defaultOptions, heading: title, borderShadowColor: this.modalShadowColor.info };
    return this.open(message, options);
  }

  public confirm(message: string): Observable<boolean> {
    const options: ModalOption = { ...this.defaultOptions, heading: 'Confirmation', borderShadowColor: this.modalShadowColor.confirm };
    return this.open(message, options);
  }

  public info(message: string): Observable<boolean> {
    const options: ModalOption = { ...this.defaultOptions, heading: 'Note', borderShadowColor: this.modalShadowColor.info };
    return this.open(message, options);
  }

  public success(message: string): Observable<void> {
    const options: ModalOption = { ...this.defaultOptions, heading: 'Congratulation', borderShadowColor: this.modalShadowColor.success };
    return this.open(message, options);
  }

  public error(message: string): Observable<void> {
    const options: ModalOption = { ...this.defaultOptions, heading: 'Error !', borderShadowColor: this.modalShadowColor.success };
    return this.open(message, options);
  }

  public warning(message: string): Observable<void> {
    const options: ModalOption = { ...this.defaultOptions, heading: 'Warning', borderShadowColor: this.modalShadowColor.warning };
    return this.open(message, options);
  }
}

export const MODAL_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ModalService,
  multi: true
};

export interface ModalOption {
  readonly heading: string;
  readonly buttons: readonly [string, string];
  readonly borderShadowColor?: string;
}
