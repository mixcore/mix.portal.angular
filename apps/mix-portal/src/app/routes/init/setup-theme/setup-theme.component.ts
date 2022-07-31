import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkeletonLoadingComponent } from '@mix/mix.ui';
import {
  MixModulePortalModel,
  MixPagePortalModel,
  MixPostPortalModel,
  MixSiteDataModel
} from '@mix-spa/mix.lib';
import { BaseComponent, TenancyApiService } from '@mix-spa/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCheckboxLabeledModule, TuiTabsModule } from '@taiga-ui/kit';
import { BehaviorSubject, delay } from 'rxjs';

@Component({
  selector: 'mix-setup-theme',
  templateUrl: './setup-theme.component.html',
  styleUrls: ['./setup-theme.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonLoadingComponent,
    TuiTabsModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule
  ]
})
export class SetupThemeComponent extends BaseComponent implements OnInit {
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public activeItemIndex = 0;
  public currentTheme: MixSiteDataModel | undefined = undefined;
  public currentPages: {
    item: MixPagePortalModel;
    selected: boolean;
  }[] = [];
  public currentModules: {
    item: MixModulePortalModel;
    selected: boolean;
  }[] = [];
  public currentPosts: {
    item: MixPostPortalModel;
    selected: boolean;
  }[] = [];

  public get currentSelectedPosts(): MixPostPortalModel[] {
    return this.currentPosts.filter(post => post.selected).map(v => v.item);
  }

  public get currentSelectedPages(): MixPagePortalModel[] {
    return this.currentPages.filter(post => post.selected).map(v => v.item);
  }

  public get currentSelectedModules(): MixModulePortalModel[] {
    return this.currentModules.filter(post => post.selected).map(v => v.item);
  }

  constructor(
    public tenancyApi: TenancyApiService,
    public cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.tenancyApi
      .loadTheme()
      .pipe(delay(1000))
      .subscribe(result => {
        this.currentTheme = result;
        this.currentModules = result.modules.map(m => ({
          item: m,
          selected: false
        }));

        this.currentPages = result.pages.map(m => ({
          item: m,
          selected: false
        }));

        this.currentPosts = result.posts.map(m => ({
          item: m,
          selected: false
        }));

        this.cdr.detectChanges();
      });
  }

  public onSelectAll(): void {
    this.onImport();
  }

  public onImport(): void {
    this.loading$.next(true);

    if (this.currentTheme) {
      const request: MixSiteDataModel = {
        ...this.currentTheme
      };

      this.tenancyApi.importTheme(request).subscribe({
        next: () => {
          this.showSuccess('Successfully setup data for your site');
          setTimeout(() => {
            this.route.navigateByUrl('/portal');
          }, 1500);
        },
        error: () => {
          this.showError('Something wrong, please try again');
          this.loading$.next(false);
        }
      });
    }
  }
}
