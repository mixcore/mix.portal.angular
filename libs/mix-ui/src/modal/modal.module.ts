import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { MixButtonComponent } from '../button';
import { ModalComponent } from './modal.component';
import { MODAL_PROVIDER } from './modal.service';

@NgModule({
  imports: [PolymorpheusModule, CommonModule, MixButtonComponent],
  providers: [MODAL_PROVIDER],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class MixModalModule {}
