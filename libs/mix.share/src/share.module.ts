import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
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

const Angular_CommonModule = [CommonModule, FormsModule, ReactiveFormsModule];

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
  TuiTabsModule,
  TuiErrorModule
];

@NgModule({
  imports: [...TaiGa_CommonModule, ...Angular_CommonModule],
  declarations: [],
  exports: [...TaiGa_CommonModule, ...Angular_CommonModule]
})
export class ShareModule {}
