import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTagModule
} from '@taiga-ui/kit';

import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MixWidgetComponent } from './components/mix-widget/mix-widget.component';

const TaiGa_CommonModule = [
  TuiInputModule,
  TuiSelectModule,
  TuiSvgModule,
  TuiAvatarModule,
  TuiButtonModule,
  TuiActiveZoneModule,
  TuiAvatarModule,
  TuiMarkerIconModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiLetModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiIslandModule,
  TuiInputModule,
  TuiLinkModule,
  TuiButtonModule,
  TuiCheckboxLabeledModule,
  TuiTextfieldControllerModule,
  TuiLabelModule,
  TuiFieldErrorModule,
  TuiTagModule
];

@NgModule({
  imports: [CommonModule, ...TaiGa_CommonModule],
  declarations: [HeaderMenuComponent, MixWidgetComponent],
  exports: [HeaderMenuComponent, MixWidgetComponent, ...TaiGa_CommonModule]
})
export class ShareModule {}
