import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { ModalOption } from './modal.service';

@Component({
  selector: 'mix-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  constructor(@Inject(POLYMORPHEUS_CONTEXT) public readonly context: TuiDialog<ModalOption, boolean>) {}

  public onClick(response: boolean): void {
    this.context.completeWith(response);
  }
}
