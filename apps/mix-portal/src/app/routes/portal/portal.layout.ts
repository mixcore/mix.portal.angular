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
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
      title: 'Universal Search (F2)',
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
    // {
    //   id: 2,
    //   title: 'Tenant',
    //   icon: 'vector-triangle',
    //   detail: [
    //     {
    //       title: 'Create new',
    //       icon: 'plus',
    //       action: () => console.log(123)
    //     },
    //     {
    //       title: 'List tenant',
    //       icon: 'list-numbers',
    //       action: () => console.log(123)
    //     },
    //     {
    //       title: 'List domain',
    //       icon: 'list-numbers',
    //       action: () => console.log(123)
    //     }
    //   ]
    // },
    {
      id: 3,
      title: 'Page',
      icon: 'address-book',
      detail: [
        {
          title: 'Create new',
          icon: 'plus',
          action: () => this.creatNew('Page')
        },
        {
          title: 'List pages',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-page')
        }
      ]
    },
    {
      id: 4,
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

  @HostListener('window:keydown.f3', ['$event'])
  new() {
    this.creatNew('Post');
  }

  @HostListener('window:keydown.alt.z', ['$event'])
  tab(e: KeyboardEvent) {
    e.preventDefault();
    console.log('enable tab');
  }

  @HostListener('window:keyup.alt', ['$event'])
  tabAlt(e: KeyboardEvent) {
    e.preventDefault();
    console.log('closeable tab');
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
