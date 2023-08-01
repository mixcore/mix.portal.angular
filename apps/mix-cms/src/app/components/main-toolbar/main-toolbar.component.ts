import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  RouterModule,
} from '@angular/router';
import { Culture } from '@mixcore/lib/model';
import { AuthService } from '@mixcore/share/auth';
import { DOMAIN_URL$ } from '@mixcore/share/base';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
} from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { filter, startWith } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CMS_ROUTES } from '../../app.routes';
import { ThemeService } from '../../shares/services/theme.service';
import { LocationControllerComponent } from '../location-controller/location-controller.component';

interface BreadcrumbOption {
  label: string;
  params: object;
  url: string;
}

@Component({
  selector: 'mix-main-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    ReactiveFormsModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    RouterModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiButtonModule,
    LocationControllerComponent,
  ],
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent implements OnInit {
  public auth = inject(AuthService);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  public modal = inject(ModalService);
  public themeService = inject(ThemeService);
  public domainUrls$ = inject(DOMAIN_URL$);

  public userMenuOpen = false;
  public dropdownOpen = false;
  public breadcrumbs: BreadcrumbOption[] = [];
  public mode = 'Prod';

  public search = new FormGroup({
    searchText: new FormControl(''),
  });

  public ngOnInit(): void {
    this.registerRouterChange();

    const current = this.domainUrls$.getValue();
    if (current === environment.domainUrl) {
      this.mode = 'Production';
    } else {
      this.mode = 'Staging';
    }
  }

  public changeCulture(culture: Culture): void {
    this.auth.changeCulture(culture);
    this.dropdownOpen = false;
  }

  public logout(): void {
    this.modal.warning('Do you want to logout ?').subscribe((ok) => {
      if (!ok) return;

      this.auth.logout(() => {
        this.router.navigateByUrl(CMS_ROUTES.auth.login.fullPath);
      });
    });
  }

  private registerRouterChange(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        startWith(true)
      )
      .subscribe(() => {
        this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
      });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        const routeUrl: string = child.snapshot.url
          .map((segment) => segment.path)
          .filter((path) => path)
          .join('/');

        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = child.snapshot.data['title'];

        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
            params: child.snapshot.params,
            url: nextUrl,
          };
          breadcrumbs.push(breadcrumb);
        }

        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
