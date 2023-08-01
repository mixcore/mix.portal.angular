export interface RsaKeys {
  PrivateKey: string;
  PublicKey: string;
}

export interface GlobalSettings {
  domain: string;
  apiEncryptKey: string;
  rsaKeys: RsaKeys;
  isEncryptApi: boolean;
  pageTypes: string[];
  moduleTypes: string[];
  mixDatabaseTypes: string[];
  dataTypes: string[];
  statuses: string[];
  expiredAt: Date;
}
