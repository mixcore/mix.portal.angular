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
  TuiHintModule,
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
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconAd2,
  IconArrowBarLeft,
  IconBrandGithub,
  IconListNumbers,
  IconPlus,
  IconSearch,
  IconSmartHome,
  IconVectorTriangle
} from 'angular-tabler-icons/icons';

const icons = {
  IconBrandGithub,
  IconVectorTriangle,
  IconSmartHome,
  IconPlus,
  IconListNumbers,
  IconAd2,
  IconArrowBarLeft,
  IconSearch
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
  TuiComboBoxModule,
  TuiStringifyContentPipeModule,
  TuiBadgeModule,
  TuiTabsModule,
  TuiErrorModule,
  TuiProgressModule,
  TuiDialogModule,
  TuiTooltipModule,
  TuiHintModule,
  TuiRadioBlockModule,
  TuiGroupModule,
  TuiEditorModule,
  TuiEditorNewModule
];

@NgModule({
  imports: [...Angular_CommonModule, ...TaiGa_CommonModule, TablerIconsModule.pick(icons)],
  declarations: [],
  exports: [...Angular_CommonModule, ...TaiGa_CommonModule, TablerIconsModule]
})
export class ShareModule {}
