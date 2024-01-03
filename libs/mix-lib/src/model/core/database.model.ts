import { DbContextFixId } from './db-context.model';

export class MixDatabase {
  systemName!: string;
  type!: string;
  selfManaged!: boolean;
  columns!: MixColumn[];
  relationships!: MixRelationShip[];
  displayName!: string;
  mixTenantId!: number;
  id!: number;
  createdDateTime!: string;
  priority!: number;
  status!: string;
  isValid!: boolean;
  errors!: string[];
  updatePermissions: string[] | undefined;
  readPermissions: string[] | undefined;
  createPermissions: string[] | undefined;
  deletePermissions: string[] | undefined;
  mixDatabaseContextId: number | undefined;

  constructor(value: MixDatabase) {
    this.systemName = value.systemName;
    this.type = value.type;
    this.selfManaged = value.selfManaged;
    this.columns = value.columns?.sort((a, b) => a.priority - b.priority);
    this.relationships = value.relationships;
    this.displayName = value.displayName;
    this.mixTenantId = value.mixTenantId;
    this.id = value.id;
    this.createdDateTime = value.createdDateTime;
    this.priority = value.priority;
    this.status = value.status;
    this.isValid = value.isValid;
    this.errors = value.errors;
    this.mixDatabaseContextId =
      value.mixDatabaseContextId ?? DbContextFixId.MasterDb;

    this.updatePermissions = value.updatePermissions
      ? JSON.parse(value.updatePermissions.toString())
      : [];
    this.readPermissions = value.readPermissions
      ? JSON.parse(value.readPermissions.toString())
      : [];
    this.deletePermissions = value.deletePermissions
      ? JSON.parse(value.deletePermissions.toString())
      : [];
    this.createPermissions = value.createPermissions
      ? JSON.parse(value.createPermissions.toString())
      : [];
  }
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
  new: boolean;
}

export enum RelationShipType {
  OneToMany = 'OneToMany',
}
export class MixColumn {
  systemName!: string;
  displayName!: string;
  mixDatabaseName!: string;
  dataType!: DataType;
  mixDatabaseId!: number;
  columnConfigurations!: ColumnConfigurations;
  id!: number;
  createdDateTime?: string;
  createdBy!: string;
  priority!: number;
  status!: string;
  isValid!: boolean;
  errors!: string[];
  new = false;

  constructor(data: Partial<MixColumn>) {
    this.systemName = data.systemName ?? '';
    this.dataType = data.dataType ?? DataType.Text;
    this.new = data.new ?? false;
    this.priority = data.priority ?? 0;
  }
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
  EmailAddress = 'EmailAddress',
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

export const STRING_DATA_TYPE = [
  DataType.Text,
  DataType.EmailAddress,
  DataType.MultilineText,
  DataType.PostalCode,
  DataType.PhoneNumber,
  DataType.Tag,
  DataType.Integer,
];

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

export const DataTypeColors: { [key in DataType]: string } = {
  Custom: '#3498db',
  DateTime: '#e74c3c',
  Date: '#2ecc71',
  Time: '#e67e22',
  Duration: '#9b59b6',
  PhoneNumber: '#1abc9c',
  Double: '#f1c40f',
  Text: '#3498db',
  Html: '#e74c3c',
  MultilineText: '#2ecc71',
  EmailAddress: '#e67e22',
  Password: '#9b59b6',
  Url: '#1abc9c',
  ImageUrl: '#f1c40f',
  CreditCard: '#3498db',
  PostalCode: '#e74c3c',
  Upload: '#2ecc71',
  Color: '#e67e22',
  Boolean: '#9b59b6',
  Icon: '#1abc9c',
  VideoYoutube: '#f1c40f',
  TuiEditor: '#3498db',
  Integer: '#e74c3c',
  Guid: '#2ecc71',
  Reference: '#e67e22',
  QRCode: '#9b59b6',
  Tag: '#1abc9c',
  Json: '#f1c40f',
  Array: '#3498db',
  ArrayMedia: '#e74c3c',
  ArrayRadio: '#2ecc71',
};

export type DataTypeConfig = {
  name: string;
  value: DataType;
  description: string;
  icon?: string;
  iconSize?: string;
};

export const DataTypeDisplay: Record<DataType, DataTypeConfig> = {
  [DataType.Custom]: {
    icon: 'question_mark',
    name: 'Custom',
    value: DataType.Custom,
    description: '',
  },
  [DataType.DateTime]: {
    icon: 'calendar_month',
    name: 'Date & Time',
    value: DataType.DateTime,
    description: '',
  },
  [DataType.Date]: {
    icon: 'calendar_today',
    name: 'Date',
    value: DataType.Date,
    description: '',
  },
  [DataType.Time]: {
    icon: 'timer',
    name: 'Time',
    value: DataType.Time,
    description: '',
  },
  [DataType.Duration]: {
    icon: 'date_range',
    name: 'Duration',
    value: DataType.Duration,
    description: '',
  },
  [DataType.PhoneNumber]: {
    icon: 'call',
    name: 'Phone Number',
    value: DataType.PhoneNumber,
    description: '',
  },
  [DataType.Double]: {
    icon: '123',
    name: 'Double',
    value: DataType.Double,
    description: '',
  },
  [DataType.Text]: {
    icon: 'text_fields',
    name: 'Text',
    value: DataType.Text,
    description: '',
  },
  [DataType.Html]: {
    icon: 'html',
    name: 'Html',
    value: DataType.Html,
    description: '',
    iconSize: '30px',
  },
  [DataType.MultilineText]: {
    icon: 'subtitles',
    name: 'Multiline Text',
    value: DataType.MultilineText,
    description: '',
  },
  [DataType.EmailAddress]: {
    icon: 'mail',
    name: 'Email',
    value: DataType.EmailAddress,
    description: '',
  },
  [DataType.Password]: {
    icon: 'password',
    name: 'Password',
    value: DataType.Password,
    description: '',
  },
  [DataType.Url]: {
    icon: 'link',
    name: 'Url',
    value: DataType.Url,
    description: '',
  },
  [DataType.ImageUrl]: {
    icon: 'link',
    name: 'Image Url',
    value: DataType.ImageUrl,
    description: '',
  },
  [DataType.CreditCard]: {
    icon: 'credit_card',
    name: 'Credit Card',
    value: DataType.CreditCard,
    description: '',
  },
  [DataType.PostalCode]: {
    icon: 'code',
    name: 'Postal Code',
    value: DataType.PostalCode,
    description: '',
  },
  [DataType.Upload]: {
    icon: 'upload',
    name: 'Upload',
    value: DataType.Upload,
    description: '',
  },
  [DataType.Color]: {
    icon: 'palette',
    name: 'Color',
    value: DataType.Color,
    description: '',
  },
  [DataType.Boolean]: {
    icon: 'toggle_on',
    name: 'True/False',
    value: DataType.Boolean,
    description: '',
  },
  [DataType.Icon]: {
    icon: 'add_reaction',
    name: 'Icon',
    value: DataType.Icon,
    description: '',
  },
  [DataType.VideoYoutube]: {
    icon: 'link',
    name: 'Video Youtube',
    value: DataType.VideoYoutube,
    description: '',
  },
  [DataType.TuiEditor]: {
    icon: 'html',
    name: 'TuiEditor',
    value: DataType.TuiEditor,
    description: '',
  },
  [DataType.Integer]: {
    icon: '123',
    name: 'Integer',
    value: DataType.Integer,
    description: '',
  },
  [DataType.Guid]: {
    icon: 'key',
    name: 'Guid',
    value: DataType.Guid,
    description: '',
  },
  [DataType.Reference]: {
    icon: 'lan',
    name: 'Reference',
    value: DataType.Reference,
    description: '',
  },
  [DataType.QRCode]: {
    icon: 'qr_code_2',
    name: 'QR Code',
    value: DataType.QRCode,
    description: '',
  },
  [DataType.Tag]: {
    icon: 'loyalty',
    name: 'Tag',
    value: DataType.Tag,
    description: '',
  },
  [DataType.Json]: {
    icon: 'dataset',
    name: 'Json',
    value: DataType.Json,
    description: '',
  },
  [DataType.Array]: {
    icon: 'data_array',
    name: 'Array',
    value: DataType.Array,
    description: '',
  },
  [DataType.ArrayMedia]: {
    icon: 'data_array',
    name: 'List of Media',
    value: DataType.ArrayMedia,
    description: '',
  },
  [DataType.ArrayRadio]: {
    icon: 'event_list',
    name: 'List of Selection',
    value: DataType.ArrayRadio,
    description: '',
  },
};

export enum DatabaseProvider {
  SQLSERVER = 'SQLSERVER',
  MySQL = 'MySQL',
  PostgreSQL = 'PostgreSQL',
  SQLITE = 'SQLITE',
}

export const DatabaseProviderDisplay: Record<
  DatabaseProvider | string,
  string
> = {
  All: 'All provider',
  [DatabaseProvider.SQLSERVER]: 'Microsoft Sql Server',
  [DatabaseProvider.MySQL]: 'My SQL',
  [DatabaseProvider.PostgreSQL]: 'Postgres Sql',
  [DatabaseProvider.SQLITE]: 'Sql Lite',
};

export const DataTypeToAgCellEditor = (dataType: DataType) => {
  switch (dataType) {
    case DataType.Text:
    case DataType.Icon:
    case DataType.ImageUrl:
    case DataType.VideoYoutube:
    case DataType.Url:
    case DataType.Password:
      return 'agTextCellEditor';
    case DataType.Integer:
    case DataType.Double:
    case DataType.Duration:
      return 'agNumberCellEditor';
    case DataType.Date:
      return 'agDateCellEditor';
    case DataType.DateTime:
      return 'agDateCellEditor';
    case DataType.MultilineText:
      return 'agLargeTextCellEditor';
    default:
      return 'agTextCellEditor';
  }
};
