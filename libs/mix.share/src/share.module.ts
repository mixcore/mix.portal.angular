import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule
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
  TuiProgressModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconAd2, IconBrandGithub, IconListNumbers, IconPlus, IconSmartHome, IconVectorTriangle } from 'angular-tabler-icons/icons';

const icons = {
  IconBrandGithub,
  IconVectorTriangle,
  IconSmartHome,
  IconPlus,
  IconListNumbers,
  IconAd2
};

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
  TuiErrorModule,
  TuiProgressModule,
  TuiDialogModule,
  TuiTooltipModule
];

@NgModule({
  imports: [...TaiGa_CommonModule, ...Angular_CommonModule, TablerIconsModule.pick(icons)],
  declarations: [],
  exports: [...TaiGa_CommonModule, ...Angular_CommonModule, TablerIconsModule]
})
export class ShareModule {}
