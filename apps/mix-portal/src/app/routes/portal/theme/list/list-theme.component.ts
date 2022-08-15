import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationRequestModel, ThemeModel } from '@mix-spa/mix.lib';
import {
  AppEvent,
  AppEventService,
  DestroyService,
  MixDataTableComponent,
  MixDataTableModule,
  MixThemeImportComponent,
  PortalSidebarControlService,
  ShareModule,
  SidebarContainerComponent,
  ThemeApiService
} from '@mix-spa/mix.share';
import { filter, takeUntil, tap } from 'rxjs';

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
  ],
  providers: [DestroyService]
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
    private sidebarControl: PortalSidebarControlService,
    private destroy$: DestroyService
  ) {
    this.appEvent.event$
      .pipe(
        filter(e => e.type === AppEvent.NewThemeAdded),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.table.reloadData();
      });
  }

  public themeClick(theme: ThemeModel): void {
    this.appEvent.notify({
      type: AppEvent.ThemeSelected,
      data: { id: theme.id }
    });
  }

  public onImportThemeClick(): void {
    this.sidebarControl.show(this.importTemp);
  }
}
