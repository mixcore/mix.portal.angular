import { AppHeaderComponet } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { CollapseButtonComponent } from './components/collapse-button/collapse-button.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { UniversalSearchComponent } from './components/universal-search/universal-search.component';
@NgModule({
  declarations: [
    AppSidebarComponent,
    CollapseButtonComponent,
    AppHeaderComponet,
    UniversalSearchComponent,
  ],
  exports: [
    AppSidebarComponent,
    CollapseButtonComponent,
    AppHeaderComponet,
    UniversalSearchComponent,
  ],
  imports: [CommonModule, MatExpansionModule, MatTooltipModule],
})
export class SharedModule {}
