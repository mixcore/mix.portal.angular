import { Culture } from './cultute.model';

export class LoginModel {
  public email: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public rememberMe = false;
  public returnUrl: string | undefined;
}

export class TokenInfo {
  public accessToken!: string;
  public tokenType!: string;
  public refreshToken!: string;
  public expiresIn: number | undefined;
  public clientId: string | undefined;
  public issuedAt: Date | undefined;
  public expiresAt: Date | undefined;
  public deviceId: string | undefined;
  public info: UserInfo | undefined;
}

export class UserInfo {
  public additionalData: never | undefined;
  public joinDate!: Date;
  public isActived = false;
  public lastModified!: Date;
  public modifiedBy?: string;
  public registerType?: string;
  public avatar?: string;
  public nickName?: string;
  public firstName?: string;
  public lastName?: string;
  public gender?: string;
  public countryId?: number;
  public culture?: Culture;
  public dob?: string;
  public roles?: string[];
  public claims?: string[];
  public logins?: string[];
  public id!: string;
  public userName!: string;
  public normalizedUserName?: string;
  public email!: string;
  public normalizedEmail?: string;
  public emailConfirmed = false;
  public passwordHash!: string;
  public securityStamp!: string;
  public concurrencyStamp!: string;
  public phoneNumber?: string;
  public phoneNumberConfirmed = false;
  public twoFactorEnabled = false;
}

export class User {
  public joinDate!: Date;
  public isActived = false;
  public lastModified!: Date;
  public modifiedBy?: string;
  public registerType?: string;
  public avatar?: string;
  public nickName?: string;
  public firstName?: string;
  public lastName?: string;
  public gender?: string;
  public countryId?: number;
  public culture?: Culture;
  public dob?: string;
  public roles?: string[];
  public claims?: string[];
  public logins?: string[];
  public id!: string;
  public userName!: string;
  public normalizedUserName?: string;
  public email!: string;
  public normalizedEmail?: string;
  public emailConfirmed = false;
  public passwordHash!: string;
  public securityStamp!: string;
  public concurrencyStamp!: string;
  public phoneNumber?: string;
  public phoneNumberConfirmed = false;
  public twoFactorEnabled = false;
}

export interface IAuthorizationData {
  aesKey: string;
  message: string;
  rsaKey: string;
}
