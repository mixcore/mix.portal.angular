export interface PortalThemeSettings {
  primaryColorHue: number;
  primaryColorSaturation: number;
  primaryColorBrightness: number;
  bgColor: string;
  textColor: string;
  primaryColor: string;
  bgColorHover: string;
  borderColor: string;
  borderColorHover: string;
  linkColor: string;
  linkColorHover: string;
  linkColorActive: string;
  textColorHover: string;
  fontFamily: string;
  fontSizeH1: string;
  fontSize: string;
}

export interface RsaKeys {
  PrivateKey: string;
  PublicKey: string;
}

export interface ExternalLoginProviders {
  Facebook: string;
  Google: string;
  Twitter: string;
  Microsoft: string;
}

export interface GlobalSettings {
  domain: string;
  portalThemeSettings: PortalThemeSettings;
  apiEncryptKey: string;
  rsaKeys: RsaKeys;
  isEncryptApi: boolean;
  pageTypes: string[];
  moduleTypes: string[];
  mixDatabaseTypes: string[];
  dataTypes: string[];
  statuses: string[];
  externalLoginProviders: ExternalLoginProviders;
  expiredAt: Date;
}