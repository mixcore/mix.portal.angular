import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
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
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { filter, startWith } from 'rxjs';
import { LocationControllerComponent } from '../location-controller/location-controller.component';
import { CollapseBtnComponent } from '../main-side-menu/collapse-btn.component';
import { ToolbarService } from './toolbar.service';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';

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
    RouterModule,
    LocationControllerComponent,
    TippyDirective,
    MixButtonComponent,
    UserNavigationComponent,
    PortalModule,
    CollapseBtnComponent,
  ],
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainToolbarComponent implements OnInit {
  @Input() public showExpandBtn = false;
  @Output() public expandChange = new EventEmitter();

  public auth = inject(AuthService);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  public toolbarService = inject(ToolbarService);
  public domainUrls$ = inject(DOMAIN_URL$);
  public breadcrumbs: BreadcrumbOption[] = [];
  public mode = 'Prod';

  public search = new FormGroup({
    searchText: new FormControl(''),
  });

  public ngOnInit(): void {
    this.registerRouterChange();
  }

  public changeCulture(culture: Culture): void {
    this.auth.changeCulture(culture);
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
