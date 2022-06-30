import {
  Component,
  HostListener,
  Inject,
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VerticalDisplayPosition } from '@mix-spa/mix.lib';
import {
  CreationDialogComponent,
  HeaderMenuComponent,
  MixChatBoxComponent,
  MixToolbarMenu,
  PortalSidebarControlService,
  PortalSidebarHostComponent,
  ShareModule,
  SideMenuComponent,
  TabControlDialogComponent,
  TabControlService,
  UniversalSearchComponent
} from '@mix-spa/mix.share';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './portal.layout.html',
  styleUrls: ['./portal.layout.scss'],
  standalone: true,
  imports: [
    HeaderMenuComponent,
    RouterModule,
    ShareModule,
    SideMenuComponent,
    UniversalSearchComponent,
    TabControlDialogComponent,
    MixChatBoxComponent,
    CreationDialogComponent,
    PortalSidebarHostComponent
  ]
})
export class PortalLayoutComponent {
  @ViewChild('creationTemplate') public createTemplate!: TemplateRef<unknown>;
  public isShowUniversalSearch = false;
  public isShowTab = false;
  public createMode: 'Page' | 'Post' | 'Module' = 'Page';

  public menuItems: MixToolbarMenu[] = [
    {
      id: 0,
      title: 'Universal Search (F2)',
      icon: 'search',
      position: VerticalDisplayPosition.Top,
      hideDetail: true,
      action: () => this.toggleUniversalSearch(),
      detail: []
    },
    {
      id: 1,
      title: 'Dashboard',
      icon: 'smart-home',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'View Dashboard',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/dashboard')
        }
      ],
      action: () => this.navigate('/portal/dashboard')
    },
    {
      id: 3,
      title: 'Posts',
      icon: 'news',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New post',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'Posts',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-post')
        }
      ],
      action: () => this.navigate('/portal/list-post')
    },
    {
      id: 4,
      title: 'Pages',
      icon: 'file-horizontal',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New page',
          icon: 'plus',
          action: () => this.createNew('Page')
        },
        {
          title: 'Pages',
          icon: 'list-numbers',
          action: () => this.navigate('/portal/list-page')
        }
      ],
      action: () => this.navigate('/portal/list-page')
    },
    {
      id: 5,
      title: 'Modules',
      icon: 'components',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New module',
          icon: 'plus',
          action: () => this.createNew('Module')
        },
        {
          title: 'Modules',
          icon: 'components',
          action: () => this.navigate('/portal/list-module')
        }
      ],
      action: () => this.navigate('/portal/list-module')
    },
    {
      id: 6,
      title: 'Databases',
      icon: 'stack2',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'Databases',
          icon: 'stack2',
          action: () => this.navigate('/portal/list-database')
        }
      ],
      action: () => this.navigate('/portal/list-database')
    },
    {
      id: 7,
      title: 'Tags',
      icon: 'tags',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New tag',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'Tags',
          icon: 'tags',
          action: () => this.navigate('/portal/list-module')
        }
      ],
      action: () => this.navigate('/portal/list-module')
    },
    {
      id: 8,
      title: 'Medias',
      icon: 'photo',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New media',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'Medias',
          icon: 'photo',
          action: () => this.navigate('/portal/list-module')
        }
      ],
      action: () => this.navigate('/portal/list-module')
    },
    {
      id: 9,
      title: 'Users',
      icon: 'users',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New user',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'Users',
          icon: 'users',
          action: () => this.navigate('/portal/list-module')
        },
        {
          title: 'Roles',
          icon: 'user-exclamation',
          action: () => this.navigate('/portal/list-role')
        },
        {
          title: 'Permissions',
          icon: 'shield-lock',
          action: () => this.navigate('/portal/list-permission')
        }
      ],
      action: () => this.navigate('/portal/list-module')
    },
    {
      id: 10,
      title: 'Themes',
      icon: 'layout',
      position: VerticalDisplayPosition.Top,
      detail: [
        {
          title: 'New theme',
          icon: 'plus',
          action: () => this.createNew('Post')
        },
        {
          title: 'Themes',
          icon: 'layout',
          action: () => this.navigate('/portal/list-theme')
        },
        {
          title: 'Mix Market',
          icon: 'shopping-cart',
          action: () => this.navigate('/portal/market')
        },
        {
          title: 'Site Navigation',
          icon: 'arrow-ramp-right',
          action: () => this.navigate('/portal/market')
        },
        {
          title: 'Modules',
          icon: 'components',
          action: () => this.navigate('/portal/list-module')
        },
        {
          title: 'Mix Databases',
          icon: 'database',
          action: () => this.navigate('/portal/list-database')
        }
      ],
      action: () => this.navigate('/portal/list-database')
    },
    {
      id: 11,
      title: 'Settings',
      icon: 'settings',
      position: VerticalDisplayPosition.Bottom,
      detail: [
        {
          title: 'Tenants',
          icon: 'sitemap'
        },
        {
          title: 'Global Setting',
          icon: 'adjustments-horizontal'
        },
        {
          title: 'Local Setting',
          icon: 'tool'
        },
        {
          title: 'Automation',
          icon: 'settings-automation'
        },
        {
          title: 'Languages',
          icon: 'world'
        },
        {
          title: 'Localize',
          icon: 'language'
        },
        {
          title: 'Files',
          icon: 'file'
        }
      ],
      action: () => this.navigate('/portal/list-module')
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
    private tabControl: TabControlService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService
  ) {}

  public createNew(type: 'Post' | 'Module' | 'Page'): void {
    this.createMode = type;
    this.sidebarControl.show(this.createTemplate);
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
