import { Component, HostListener, Inject, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  CreationDialogComponent,
  HeaderMenuComponent,
  MixToolbarMenu,
  ShareModule,
  SideMenuComponent,
  TabControlDialogComponent,
  TabControlService,
  UniversalSearchComponent
} from '@mix-spa/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './portal.layout.html',
  styleUrls: ['./portal.layout.scss'],
  standalone: true,
  imports: [HeaderMenuComponent, RouterModule, ShareModule, SideMenuComponent, UniversalSearchComponent, TabControlDialogComponent]
})
export class PortalLayoutComponent {
  public isShowUniversalSearch = false;
  public isShowTab = false;

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
    {
      id: 3,
      title: 'Post',
      icon: 'news',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Posts',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-post')
        }
      ]
    },
    {
      id: 4,
      title: 'Page',
      icon: 'file-horizontal',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Page')
        },
        {
          title: 'List Pages',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-page')
        }
      ]
    },
    {
      id: 5,
      title: 'Module',
      icon: 'components',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Module',
          icon: 'components',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 6,
      title: 'Categories',
      icon: 'stack2',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Categories',
          icon: 'stack2',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 7,
      title: 'Tags',
      icon: 'tags',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Tags',
          icon: 'tags',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 8,
      title: 'Medias',
      icon: 'photo',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Medias',
          icon: 'photo',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 9,
      title: 'Users',
      icon: 'users',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Users',
          icon: 'users',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 10,
      title: 'Themes',
      icon: 'layout',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Themes',
          icon: 'layout',
          action: () => this.navigate('/portal/list-module')
        }
      ]
    },
    {
      id: 11,
      title: 'Settings',
      icon: 'settings',
      detail: [
        {
          title: 'Create New',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'List Settings',
          icon: 'settings',
          action: () => this.navigate('/portal/list-module')
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
    this.createNew('Post');
  }

  @HostListener('window:keydown.alt.z', ['$event'])
  tab(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(true);
  }

  @HostListener('window:keyup.alt', ['$event'])
  tabAlt(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(false);
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private router: Router,
    private tabControl: TabControlService
  ) {}

  public createNew(type: 'Post' | 'Module' | 'Page'): void {
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

  public toggleTabControl(show: boolean): void {
    if (this.isShowTab && show) {
      this.tabControl.nextTab();
    }

    this.isShowTab = show;
  }
}
