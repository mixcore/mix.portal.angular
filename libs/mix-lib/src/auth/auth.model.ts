import { Culture } from './culture.model';

export interface SignUpModel {
  userName: string;
  email: string;
  phoneNumber?: string;
  provider?: 'Facebook';
  providerKey?: string;
  password: string;
  confirmPassword: string;
  data?: Record<string, string>;
}

export class LoginModel {
  public email: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public rememberMe = false;
  public returnUrl: string | undefined;
}

export class SocialLoginModel {
  public email?: string | undefined;
  public userName?: string | undefined;
  public phoneNumber?: string | undefined;
  public provider?: 'Facebook' | 'Google' | 'Firebase' = 'Facebook';
  public externalAccessToken: string | undefined;
  public deviceToken?: string;
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
  public information: UserInfo | undefined;
}

export class StepRewardItem {
  public image!: string;
  public title!: string;
  public number!: number;
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
  public contactNumber?: string;
  public phoneNumberConfirmed = false;
  public twoFactorEnabled = false;
  public userData?: Record<string, string>;
  public lifePoint = 0;
  public isMaxLevel = false;
  public tier = '';
  public continuousMonthImages: StepRewardItem[] = [];
}

export class User {
  public joinDate!: Date;
  public isActived = false;
  public lastModified!: Date;
  public modifiedBy?: string;
  public registerType?: string;
  public avatar?: string;
  public name?: string;
  public nickName?: string;
  public firstName?: string;
  public lastName?: string;
  public gender?: string;
  public countryId?: number;
  public culture?: Culture;
  public dob?: string;
  public roles?: UserInfoRoles[];
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
  public contactNumber?: string;
  public twoFactorEnabled = false;
  public fullname?: string;
  public birthDate?: Date;
  public userData?: Record<string, string>;
  public province?: string;
  public district?: string;
  public ward?: string;
  public address?: string;
  public lifePoint = 0;
  public isMaxLevel = false;
  public tier = '';
  public continuousMonthImages: StepRewardItem[] = [];
}

export interface IAuthorizationData {
  aesKey: string;
  message: string;
  rsaKey: string;
}

export interface UserInfoRoles {
  roleId: string;
  userId: string;
}
