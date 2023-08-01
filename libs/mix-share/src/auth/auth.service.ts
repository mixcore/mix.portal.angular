import { Injectable, InjectionToken, inject } from '@angular/core';
import {
  GlobalSettings,
  LoginModel,
  SignUpModel,
  TokenInfo,
  User,
} from '@mixcore/lib/auth';
import { MixSwagger } from '@mixcore/lib/swagger';

import { HttpErrorResponse } from '@angular/common/http';
import {
  Culture,
  MenuItem,
  MixRole,
  MixRoleConst,
  PaginationRequestModel,
  PaginationResultModel,
  PortalMenu,
} from '@mixcore/lib/model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { MixDatabaseApi } from '../api-service/database-api.service';
import { MixAccountApi } from '../api-service/mix-account-api';
import { BaseApiService } from '../bases/base-api.service';
import { cryptoService } from './crypto-service';

export const FULL_MENU = new InjectionToken<MenuItem[]>(
  'Available routes for your application'
);

export const PRODUCT_MENU = new InjectionToken<MenuItem[]>(
  'Available routes for no super admin'
);

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {
  public FULL_ROUTES = inject(FULL_MENU);
  public SCOPED_ROUTES = inject(PRODUCT_MENU);
  // public mixApi = inject(MixApiFacadeService);
  public accountApi = new MixAccountApi();
  public databaseApi = new MixDatabaseApi(MixSwagger.content.database);

  public static EXT_ACCESS_TOKEN = 'external_access_token';
  public static ACCESS_TOKEN = 'access_token';
  public static REFRESH_TOKEN = 'refresh_token';
  public static TOKEN_TYPE = 'token_type';
  public static CULTURE = 'culture';

  public user$ = new BehaviorSubject<User | null>(null);
  public cultures$ = new BehaviorSubject<Culture[]>([]);
  public currentCulture: Culture | undefined = undefined;
  public isAuthorized$ = new BehaviorSubject<boolean | undefined>(undefined);
  public logout$ = new Subject<void>();
  public portalMenu: MenuItem[] = [];
  public currentRoles: MixRole[] = [];

  public get accessToken(): string | null {
    return localStorage.getItem(AuthService.ACCESS_TOKEN);
  }

  public get tokenType(): string | null {
    return localStorage.getItem(AuthService.TOKEN_TYPE);
  }

  public login(
    loginData: LoginModel,
    apiEncryptKey: string
  ): Observable<TokenInfo> {
    const encrypted = cryptoService.encryptAES(
      JSON.stringify(loginData),
      apiEncryptKey
    );

    return this.post<{ message: string }, TokenInfo>(MixSwagger.auth.signIn, {
      message: encrypted,
    }).pipe(
      switchMap((tokenInfo) => {
        if (tokenInfo?.info) {
          localStorage.setItem(AuthService.ACCESS_TOKEN, tokenInfo.accessToken);
          localStorage.setItem(
            AuthService.REFRESH_TOKEN,
            tokenInfo.refreshToken
          );
          localStorage.setItem(AuthService.TOKEN_TYPE, tokenInfo.tokenType);
        }

        this.isAuthorized$.next(true);

        return of(tokenInfo);
      })
    );
  }

  public logout(callback?: () => void): void {
    localStorage.removeItem(AuthService.EXT_ACCESS_TOKEN);
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
    localStorage.removeItem(AuthService.REFRESH_TOKEN);
    localStorage.removeItem(AuthService.TOKEN_TYPE);

    this.logout$.next();
    this.isAuthorized$.next(false);
    this.user$.next(null);
    this.currentRoles = [];
    this.portalMenu = [];

    if (callback) callback();
  }

  public register(userData: SignUpModel): Observable<void> {
    return this.post<SignUpModel, void>(MixSwagger.auth.register, userData);
  }

  public fetchUserData(): Observable<User> {
    return this.get<User>(MixSwagger.auth.getProfile).pipe(
      switchMap((result) => {
        this.user$.next(result);
        return of(result);
      })
    );
  }

  public getGlobalSetting(): Observable<GlobalSettings> {
    return this.get<GlobalSettings>(MixSwagger.global.globalSetting);
  }

  public gelCultures(): Observable<PaginationResultModel<Culture>> {
    return this.get<PaginationResultModel<Culture>>(MixSwagger.auth.culture, {
      pageSize: 100,
    });
  }

  public initRoles() {
    const currentRoles = this.user$.getValue()?.roles;
    let request: Observable<MixRole>[] = [];

    if (currentRoles?.length) {
      request = currentRoles.map((role) =>
        this.accountApi.getRoleById(role.roleId)
      );
    }

    return forkJoin(request).pipe(
      switchMap((roles) => {
        this.currentRoles = roles ?? [];

        return of(roles);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }

  public initCultures() {
    return this.gelCultures().pipe(
      switchMap((result) => {
        this.cultures$.next(result.items ?? []);
        const culture = localStorage.getItem(AuthService.CULTURE);
        if (culture) {
          this.currentCulture = JSON.parse(culture);
        } else {
          this.currentCulture = result.items[0];
        }

        return of(result);
      }),
      catchError((error) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }

  public initPortalsMenu() {
    if (this.currentRoles.some((x) => x.name === MixRoleConst.SuperAdmin)) {
      this.portalMenu = this.FULL_ROUTES;
      return of(this.FULL_ROUTES);
    }

    // this.portalMenu = this.SCOPED_ROUTES;
    // return of(this.SCOPED_ROUTES);

    // const roleNames = this.currentRoles.map((x) => x.name);
    // const roleNameSearch = roleNames.join(',');

    // const requests = roleNames.map((name) => this.getPortalMenuByRole(name));
    return this.getPortalMenuByRole('Owner').pipe(
      switchMap((portalMenus: PortalMenu[]) => {
        const menuItems = portalMenus.map(
          (x) =>
            <MenuItem>{
              ...x,
              url: x.path,
              children: x.childMenu?.map((c) => ({ ...c, url: c.path })),
            }
        );

        this.portalMenu = menuItems;

        return of(this.portalMenu);
      })
    );
  }

  public changeCulture(culture: Culture) {
    this.currentCulture = culture;
    localStorage.setItem(AuthService.CULTURE, JSON.stringify(culture));
    window.location.reload();
  }

  public clearRedirectUrl(): void {
    localStorage.setItem('redirectUrl', '');
  }

  public get redirectUrl(): string | null {
    return localStorage.getItem('redirectUrl');
  }

  public getPortalMenuByRole(roleName: string) {
    const query = <PaginationRequestModel>{
      pageIndex: 0,
      pageSize: 30,
      searchMethod: 'InRange',
      searchColumns: 'Role',
    };
    const portalMenuDebName = 'PortalMenu';
    return this.databaseApi
      .getDataByName<PortalMenu>(portalMenuDebName, {
        ...query,
        keyword: roleName,
        queries: [
          {
            fieldName: 'PortalMenuId',
            value: null,
            compareOperator: 'Equal',
            isRequired: false,
          },
        ],
      })
      .pipe(
        switchMap((result) => {
          if (!result.items.length) {
            return of(result.items);
          }

          const request = result.items.map((data, index) => {
            return this.databaseApi
              .getDataByName<PortalMenu>(portalMenuDebName, {
                ...query,
                keyword: roleName,
                parentId: data.id,
                parentName: portalMenuDebName,
              })
              .pipe(
                map((v) => {
                  result.items[index].childMenu = [...v.items];

                  return v;
                })
              );
          });

          return forkJoin(request).pipe(map(() => result.items));
        })
      );
  }
}
