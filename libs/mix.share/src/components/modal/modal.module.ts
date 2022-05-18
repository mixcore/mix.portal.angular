import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { ModalComponent } from './modal.component';
import { MODAL_PROVIDER } from './modal.service';

@NgModule({
  imports: [TuiButtonModule, PolymorpheusModule, CommonModule],
  providers: [MODAL_PROVIDER],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  entryComponents: [ModalComponent]
})
export class MixModalModule {}
