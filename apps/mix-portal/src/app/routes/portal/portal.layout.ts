import { Component, Inject, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CreationDialogComponent, HeaderMenuComponent, MixToolbarMenu, ShareModule, SideMenuComponent } from '@mix-spa/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';

@Component({
  selector: 'mix-portal-layout',
  template: `<div class="cms-portal-container">
    <mix-side-menu [menuItems]="menuItems"></mix-side-menu>
    <div class="cms-portal-container__workspace">
      <mix-header-menu></mix-header-menu>
      <div class="cms-portal-container__main-workspace">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div> `,
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
          padding: 10px;
          box-sizing: border-box;
        }
      }
    `
  ],
  standalone: true,
  imports: [HeaderMenuComponent, RouterModule, ShareModule, SideMenuComponent]
})
export class PortalLayoutComponent {
  public menuItems: MixToolbarMenu[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'smart-home',
      detail: [
        {
          title: 'Statistical',
          icon: 'list-numbers',
          action: () => console.log(123)
        },
        {
          title: 'News',
          icon: 'list-numbers',
          action: () => console.log(123)
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
}
