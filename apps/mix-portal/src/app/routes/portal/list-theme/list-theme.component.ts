import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationRequestModel, ThemeModel } from '@mix-spa/mix.lib';
import {
  AppEvent,
  AppEventService,
  MixDataTableComponent,
  MixDataTableModule,
  MixThemeImportComponent,
  PortalSidebarControlService,
  ShareModule,
  SidebarContainerComponent,
  ThemeApiService
} from '@mix-spa/mix.share';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'mix-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    MixThemeImportComponent,
    SidebarContainerComponent
  ]
})
export class ListThemeComponent {
  @ViewChild('importTheme') public importTemp!: TemplateRef<HTMLElement>;
  @ViewChild(MixDataTableComponent)
  public table!: MixDataTableComponent<ThemeModel>;

  public totalTheme: number | undefined = 0;
  public fetchDataFn = (filter: PaginationRequestModel) =>
    this.themeApi
      .getThemes(filter)
      .pipe(tap(result => (this.totalTheme = result.pagingData.total)));

  constructor(
    private themeApi: ThemeApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private appEvent: AppEventService,
    private sidebarControl: PortalSidebarControlService
  ) {
    this.appEvent.event$
      .pipe(filter(e => e === AppEvent.NewThemeAdded))
      .subscribe(() => {
        this.table.reloadData();
      });
  }

  public themeClick(theme: ThemeModel): void {
    this.route.navigate(['list-template', theme.id], {
      relativeTo: this.activatedRoute.parent
    });
  }

  public onImportThemeClick(): void {
    this.sidebarControl.show(this.importTemp);
  }
}
