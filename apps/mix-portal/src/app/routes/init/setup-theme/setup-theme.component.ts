import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkeletonLoadingComponent } from '@mix/mix.ui';
import { MixSiteDataModel } from '@mix-spa/mix.lib';
import { TenancyApiService } from '@mix-spa/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCheckboxLabeledModule, TuiTabsModule } from '@taiga-ui/kit';
import { delay } from 'rxjs';

@Component({
  selector: 'mix-setup-theme',
  templateUrl: './setup-theme.component.html',
  styleUrls: ['./setup-theme.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonLoadingComponent,
    TuiTabsModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule
  ]
})
export class SetupThemeComponent implements OnInit {
  public activeItemIndex = 0;
  public currentTheme: MixSiteDataModel | undefined = undefined;

  constructor(public tenancyApi: TenancyApiService) {}

  public ngOnInit(): void {
    this.tenancyApi
      .loadTheme()
      .pipe(delay(1000))
      .subscribe(result => {
        this.currentTheme = result;
      });
  }
}
