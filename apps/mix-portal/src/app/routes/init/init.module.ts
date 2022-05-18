import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDataListModule, TuiLabelModule, TuiLinkModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule
} from '@taiga-ui/kit';

import { InitAccountInformationComponent } from './components/init-account-information/init-account-information.component';
import { InitSiteInformationComponent } from './components/init-site-information/init-site-information.component';
import { InitThemesComponent } from './components/init-themes/init-themes.component';
import { InitComponent } from './init.component';

const routes: Route[] = [
  {
    path: '',
    component: InitComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TuiStepperModule,
    TuiIslandModule,
    TuiInputModule,
    TuiSelectModule,
    TuiLinkModule,
    TuiFieldErrorModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiStringifyContentPipeModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiLabelModule
  ],
  providers: [],
  declarations: [InitComponent, InitAccountInformationComponent, InitSiteInformationComponent, InitThemesComponent]
})
export class InitModule {}
