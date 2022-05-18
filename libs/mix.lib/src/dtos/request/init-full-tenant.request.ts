import { AccountModel } from '../../models/src/account.model';
import { InitTenantModel } from '../../models/src/init-tenant.model';

export interface IInitFullTenantRequest {
  tenantData: InitTenantModel;
  accountData: AccountModel;
}
