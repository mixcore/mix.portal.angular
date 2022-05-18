import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { TuiButtonModule, TuiLabelModule, TuiLinkModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit';

import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TuiInputModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiLabelModule,
    TuiFieldErrorModule
  ],
  exports: [],
  providers: [],
  declarations: [LoginComponent]
})
export class AuthModule {}
