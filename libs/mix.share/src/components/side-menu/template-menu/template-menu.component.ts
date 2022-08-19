import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { filter, takeUntil } from 'rxjs';

import { RouteConfig } from '../../../routes/routes.const';
import {
  AppEvent,
  AppEventService
} from '../../../services/helper/app-event.service';
import { DestroyService } from '../../../services/helper/destroy.service';
import { ThemeFileTreeComponent } from '../../theme-file-tree/theme-file-tree.component';
import { ResizeObserverDirective } from '../resize-observer.directive';

@Component({
  selector: 'mix-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    RouterModule,
    ThemeFileTreeComponent,
    ResizeObserverDirective
  ],
  providers: [DestroyService]
})
export class TemplateMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public selectedThemeId: number | undefined = undefined;
  public selectedTheme: { title: string; id: number }[] = [];

  public fileTreeHeight = '50vh';
  @ViewChild('mainMenu', { static: true }) public mainMenu!: ElementRef;
  @ViewChild('fileTree', { static: false }) public fileTree!: ElementRef;
  constructor(
    private route: Router,
    public appEvent: AppEventService,
    public destroy$: DestroyService,
    private host: ElementRef
  ) {
    this.appEvent.event$
      .pipe(
        filter(e => e.type === AppEvent.ThemeSelected),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        if (this.selectedTheme.find(i => i.id == e.data.id)) {
          return;
        }

        this.selectedTheme.push(e.data);
        this.selectedThemeId = e.data.id;
      });
  }

  public resizeChange(entry: ResizeObserverEntry): void {
    const fullHeight = this.host.nativeElement.children[0].clientHeight;
    const menuHeight = this.mainMenu.nativeElement.clientHeight;
    this.fileTreeHeight = `${fullHeight - menuHeight - 150}px`;
  }

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }
}
