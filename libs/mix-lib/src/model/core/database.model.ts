export interface MixDatabase {
  systemName: string;
  type: string;
  selfManaged: boolean;
  columns: MixColumn[];
  relationships: MixRelationShip[];
  displayName: string;
  mixTenantId: number;
  id: number;
  createdDateTime: string;
  priority: number;
  status: string;
  isValid: boolean;
  errors: string[];
}

export interface MixRelationShip {
  parentId: number;
  childId: number;
  displayName: string;
  sourceDatabaseName: string;
  destinateDatabaseName: string;
  type: RelationShipType;
  referenceColumnName: string;
  id: number;
  createdDateTime: string;
  priority: number;
  status: string;
  isDeleted: boolean;
}

export enum RelationShipType {
  OneToMany = 'OneToMany',
}

export interface MixColumn {
  systemName: string;
  displayName: string;
  mixDatabaseName: string;
  dataType: DataType;
  mixDatabaseId: number;
  columnConfigurations: ColumnConfigurations;
  id: number;
  createdDateTime: string;
  createdBy: string;
  priority: number;
  status: string;
  isValid: boolean;
  errors: string[];
}

export interface ColumnConfigurations {
  isRequire: boolean;
  isEncrypt: boolean;
  upload: Upload;
  allowedValues: string[];
}

export interface Upload {
  arrayAccepts: string[];
  accepts: string;
  isCrop: boolean;
}

export enum DataType {
  Custom = 'Custom',
  DateTime = 'DateTime',
  Date = 'Date',
  Time = 'Time',
  Duration = 'Duration',
  PhoneNumber = 'PhoneNumber',
  Double = 'Double',
  Text = 'Text',
  Html = 'Html',
  MultilineText = 'MultilineText',
  EmailAddress = ' EmailAddress',
  Password = 'Password',
  Url = 'Url',
  ImageUrl = 'ImageUrl',
  CreditCard = 'CreditCard',
  PostalCode = 'PostalCode',
  Upload = 'Upload',
  Color = 'Color',
  Boolean = 'Boolean',
  Icon = 'Icon',
  VideoYoutube = 'VideoYoutube',
  TuiEditor = 'TuiEditor',
  Integer = 'Integer',
  Guid = 'Guid',
  Reference = 'Reference',
  QRCode = 'QRCode',
  Tag = 'Tag',
  Json = 'Json',
  Array = 'Array',
  ArrayMedia = 'ArrayMedia',
  ArrayRadio = 'ArrayRadio',
}

export enum DataTypeUi {
  TextSelect = 'Choose',
}

export interface MixDynamicData {
  id?: number;
  priority?: number;
  [key: string]: MixDynamicDataValue;
}

export type MixDynamicDataValue =
  | string
  | string[]
  | Date
  | number
  | boolean
  | undefined
  | object
  | null;
