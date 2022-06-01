import { Component, HostListener, Inject, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  CreationDialogComponent,
  HeaderMenuComponent,
  MixToolbarMenu,
  ShareModule,
  SideMenuComponent,
  UniversalSearchComponent
} from '@mix-spa/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './portal.layout.html',
  styles: [
    `
      .cms-portal-container {
        width: 100vw;
        height: 100vh;
        display: flex;

        &__workspace {
          width: 100%;
        }

        &__main-workspace {
          width: 100%;
          box-sizing: border-box;
        }
      }
    `
  ],
  standalone: true,
  imports: [HeaderMenuComponent, RouterModule, ShareModule, SideMenuComponent, UniversalSearchComponent]
})
export class PortalLayoutComponent {
  public isShowUniversalSearch = false;

  public menuItems: MixToolbarMenu[] = [
    {
      id: 0,
      title: 'Universal Search',
      icon: 'search',
      hideDetail: true,
      action: () => this.toggleUniversalSearch(),
      detail: []
    },
    {
      id: 1,
      title: 'Dashboard',
      icon: 'smart-home',
      detail: [
        {
          title: 'Statistical',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/dashboard')
        }
      ]
    },
    {
      id: 2,
      title: 'Tenant',
      icon: 'vector-triangle',
      detail: [
        {
          title: 'Create new',
          icon: 'plus',
          action: () => console.log(123)
        },
        {
          title: 'List tenant',
          icon: 'list-numbers',
          action: () => console.log(123)
        },
        {
          title: 'List domain',
          icon: 'list-numbers',
          action: () => console.log(123)
        }
      ]
    },
    {
      id: 3,
      title: 'Post',
      icon: 'ad-2',
      detail: [
        {
          title: 'Create new',
          icon: 'plus',
          action: () => this.creatNew('Post')
        },
        {
          title: 'List posts',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-post')
        }
      ]
    }
  ];

  @HostListener('window:keydown.f2', ['$event'])
  showSearch() {
    this.toggleUniversalSearch();
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private router: Router
  ) {}

  public creatNew(type: 'Post' | 'Module' | 'Page'): void {
    const dialog = this.dialogService.open(new PolymorpheusComponent(CreationDialogComponent, this.injector), {
      data: type
    });

    dialog.pipe(take(1)).subscribe();
  }

  public navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  public toggleUniversalSearch(): void {
    this.isShowUniversalSearch = !this.isShowUniversalSearch;
  }
}
