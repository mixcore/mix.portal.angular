import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationRequestModel, ThemeModel } from '@mix-spa/mix.lib';
import {
  MixDataTableModule,
  ShareModule,
  ThemeApiService
} from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss'],
  standalone: true,
  imports: [ShareModule, MixDataTableModule]
})
export class ListThemeComponent {
  public fetchDataFn = (filter: PaginationRequestModel) =>
    this.themeApi.getThemes(filter);

  constructor(
    private themeApi: ThemeApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public themeClick(theme: ThemeModel): void {
    this.route.navigate(['list-template', theme.id], {
      relativeTo: this.activatedRoute.parent
    });
  }
}
