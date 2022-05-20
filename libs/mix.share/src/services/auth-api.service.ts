import { Injectable } from '@angular/core';
import { cryptoService, IAuthorizationData, LocalStorageKeys, LoginModel, MixApiDict, TokenInfo, User, UserInfo } from '@mix-spa/mix.lib';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseApiService } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService extends BaseApiService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public logout(callback?: () => void): void {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.TOKEN_TYPE);
    if (callback) callback();
  }

  public login(loginData: LoginModel, apiEncryptKey: string): Observable<IAuthorizationData> {
    const encrypted = cryptoService.encryptAES(JSON.stringify(loginData), apiEncryptKey);
    return this.post<{ message: string }, IAuthorizationData>(MixApiDict.ShareApi.signInEndpoint, { message: encrypted }).pipe(
      tap((data: IAuthorizationData) => {
        const tokenInfo = JSON.parse(cryptoService.decryptAES(data.message, data.aesKey)) as TokenInfo;

        if (tokenInfo && tokenInfo.info) this.user$.next(tokenInfo.info);
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, tokenInfo.accessToken);
        localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, tokenInfo.refreshToken);
        localStorage.setItem(LocalStorageKeys.TOKEN_TYPE, tokenInfo.tokenType);
      })
    );
  }

  public fetchUserInfo(): Observable<UserInfo> {
    return this.get<UserInfo>(MixApiDict.ShareApi.getAccountProfileEndpoint);
  }

  public get getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  public get getTokenType(): string | null {
    return localStorage.getItem(LocalStorageKeys.TOKEN_TYPE);
  }
}
