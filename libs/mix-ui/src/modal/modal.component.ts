import {
  Component,
  Inject,
  Injector,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { TuiDestroyService, TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { TuiDialogCloseService } from '@taiga-ui/core';
import { Observable, takeUntil } from 'rxjs';
import { ModalOption } from './modal.service';

@Component({
  selector: 'mix-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TuiDestroyService, TuiDialogCloseService],
})
export class ModalComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<ModalOption, boolean>,
    @Inject(TuiDialogCloseService) close$: Observable<unknown>,
    @Self() @Inject(TuiDestroyService) destroy$: Observable<unknown>,
    public injector: Injector
  ) {
    close$
      .pipe(takeUntil(destroy$))
      .subscribe(() => this.context.$implicit.complete());
  }

  public onClick(response: boolean): void {
    this.context.completeWith(response);
  }
}
