import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  TuiBadgeModule,
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule
} from '@taiga-ui/kit';

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
  TuiTagModule,
  TuiStepperModule,
  TuiStringifyPipeModule,
  TuiComboBoxModule,
  TuiStringifyContentPipeModule,
  TuiBadgeModule,
  ReactiveFormsModule,
  TuiTabsModule
];

@NgModule({
  imports: [CommonModule, ...TaiGa_CommonModule],
  declarations: [],
  exports: [CommonModule, ...TaiGa_CommonModule]
})
export class ShareModule {}
