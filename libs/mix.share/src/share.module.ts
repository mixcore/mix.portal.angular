import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiEditorModule, TuiEditorNewModule } from '@taiga-ui/addon-editor';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintControllerModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiProgressModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiToggleModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { ICONS } from './icons.module';

const Angular_CommonModule = [CommonModule, FormsModule, ReactiveFormsModule];

const TaiGa_CommonModule = [
  TuiInputModule,
  TuiSelectModule,
  TuiComboBoxModule,
  TuiMultiSelectModule,
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
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiLabelModule,
  TuiIslandModule,
  TuiInputModule,
  TuiTextAreaModule,
  TuiLinkModule,
  TuiButtonModule,
  TuiCheckboxLabeledModule,
  TuiTextfieldControllerModule,
  TuiLabelModule,
  TuiFieldErrorModule,
  TuiTagModule,
  TuiStepperModule,
  TuiStringifyPipeModule,
  TuiStringifyContentPipeModule,
  TuiBadgeModule,
  TuiTabsModule,
  TuiErrorModule,
  TuiProgressModule,
  TuiDialogModule,
  TuiTooltipModule,
  TuiHintModule,
  TuiHintControllerModule,
  TuiRadioBlockModule,
  TuiGroupModule,
  TuiEditorModule,
  TuiEditorNewModule,
  TuiInputDateRangeModule,
  TuiAvatarModule,
  TuiToggleModule,
  TuiAccordionModule
];

@NgModule({
  imports: [
    ...Angular_CommonModule,
    ...TaiGa_CommonModule,
    TablerIconsModule.pick(ICONS)
  ],
  declarations: [],
  exports: [...Angular_CommonModule, ...TaiGa_CommonModule, TablerIconsModule]
})
export class ShareModule {}
