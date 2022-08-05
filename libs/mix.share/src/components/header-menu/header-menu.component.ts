import { Component, Inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET,
  Router,
  RouterModule
} from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { filter, startWith } from 'rxjs';

import { AuthApiService } from '../../services';
import { ShareModule } from '../../share.module';
import { ModalService } from '../modal/modal.service';
import { HeaderMenuService } from './header-menu.service';

export interface BreadcrumbOption {
  caption: string;
  params: Params;
  routerLink: string;
}

@Component({
  selector: 'mix-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  standalone: true,
  imports: [ShareModule, TuiBreadcrumbsModule, RouterModule, TuiLinkModule]
})
export class HeaderMenuComponent {
  public user$ = this.authService.user$;
  public breadcrumb: BreadcrumbOption[] = [];

  constructor(
    public authService: AuthApiService,
    public headerService: HeaderMenuService,
    private router: Router,
    @Inject(ModalService) private readonly modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this._registerRouterChange();
  }

  public logout(): void {
    this.modalService.confirm('Do you want to sign out ?').subscribe(ok => {
      if (ok)
        this.authService.logout(() => this.router.navigateByUrl('/auth/login'));
    });
  }

  private _registerRouterChange(): void {
    try {
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          startWith(true)
        )
        .subscribe(() => {
          this.breadcrumb = this._getBreadcrumbs(this.activatedRoute.root);
        });
    } catch (e) {
      throw new Error(`Error when try to load breadcrumb.`);
    }
  }

  private _getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET && !!child.snapshot) {
        const routeUrl: string = child.snapshot.url
          .map(segment => segment.path)
          .filter(path => path)
          .join('/');

        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = child.snapshot.data['title'];

        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            caption: breadcrumbLabel,
            params: child.snapshot.params,
            routerLink: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }

        return this._getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
