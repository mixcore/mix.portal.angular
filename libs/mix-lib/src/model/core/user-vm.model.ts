import { MixRole } from './roles.model';

export interface UserDetail {
  id: string;
  userName: string;
  email: string;
  createdDateTime: string;
  isActived: boolean;
  userData: UserData;
  roles: Role[];
  endpoints: string[];
  isChangePassword: boolean;
}

export interface UserData {
  id: number;
  createdDateTime: Date;
  lastModified: string;
  mixTenantId: number;
  createdBy: string;
  modifiedBy: string;
  priority: number;
  status: string;
  isDeleted: boolean;
  avatar: string;
  parentId: string;
  parentType: string;
  phoneNumber: number;
  fullname: string;
  email: string;
  dateOfBirth: Date;
}

export interface Role {
  userId: string;
  roleId: string;
  mixTenantId: number;
}

export class UserListVm {
  public createdDateTime?: string;
  public isActived?: boolean;
  public id!: string;
  public userName?: string;
  public normalizedUserName?: string;
  public email?: string;
  public normalizedEmail?: string;
  public emailConfirmed?: boolean;
  public passwordHash?: string;
  public securityStamp?: string;
  public concurrencyStamp?: string;
  public phoneNumberConfirmed?: boolean;
  public twoFactorEnabled?: boolean;
  public lockoutEnabled?: boolean;
  public accessFailedCount?: number;
  public data?: UserDetail;
  public roles: MixRole[] = [];

  constructor(data: Partial<UserListVm>) {
    Object.keys(data).forEach((key) => {
      (this as any)[key] = (data as any)[key];
    });
  }

  withUserData(data?: UserDetail) {
    this.data = data;

    return this;
  }
}
