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

export const DataTypeDisplay: Record<
  DataType,
  { name: string; value: DataType; description: string; icon?: string }
> = {
  [DataType.Custom]: {
    name: 'Custom',
    value: DataType.Custom,
    description: '',
  },
  [DataType.DateTime]: {
    name: 'Date & Time',
    value: DataType.DateTime,
    description: '',
  },
  [DataType.Date]: {
    name: 'Date',
    value: DataType.Date,
    description: '',
  },
  [DataType.Time]: {
    name: 'Time',
    value: DataType.Time,
    description: '',
  },
  [DataType.Duration]: {
    name: 'Duration',
    value: DataType.Duration,
    description: '',
  },
  [DataType.PhoneNumber]: {
    name: 'Phone Number',
    value: DataType.PhoneNumber,
    description: '',
  },
  [DataType.Double]: {
    name: 'Double',
    value: DataType.Double,
    description: '',
  },
  [DataType.Text]: {
    name: 'Text',
    value: DataType.Text,
    description: '',
  },
  [DataType.Html]: {
    name: 'Html',
    value: DataType.Html,
    description: '',
  },
  [DataType.MultilineText]: {
    name: 'Multiline Text',
    value: DataType.MultilineText,
    description: '',
  },
  [DataType.EmailAddress]: {
    name: 'Email',
    value: DataType.EmailAddress,
    description: '',
  },
  [DataType.Password]: {
    name: 'Password',
    value: DataType.Password,
    description: '',
  },
  [DataType.Url]: {
    name: 'Url',
    value: DataType.Url,
    description: '',
  },
  [DataType.ImageUrl]: {
    name: 'Image Url',
    value: DataType.ImageUrl,
    description: '',
  },
  [DataType.CreditCard]: {
    name: 'Credit Card',
    value: DataType.CreditCard,
    description: '',
  },
  [DataType.PostalCode]: {
    name: 'Postal Code',
    value: DataType.PostalCode,
    description: '',
  },
  [DataType.Upload]: {
    name: 'Upload',
    value: DataType.Upload,
    description: '',
  },
  [DataType.Color]: {
    name: 'Color',
    value: DataType.Color,
    description: '',
  },
  [DataType.Boolean]: {
    name: 'True/False',
    value: DataType.Boolean,
    description: '',
  },
  [DataType.Icon]: {
    name: 'Icon',
    value: DataType.Icon,
    description: '',
  },
  [DataType.VideoYoutube]: {
    name: 'Video Youtube',
    value: DataType.VideoYoutube,
    description: '',
  },
  [DataType.TuiEditor]: {
    name: 'TuiEditor',
    value: DataType.TuiEditor,
    description: '',
  },
  [DataType.Integer]: {
    name: 'Integer',
    value: DataType.Integer,
    description: '',
  },
  [DataType.Guid]: {
    name: 'Guid',
    value: DataType.Guid,
    description: '',
  },
  [DataType.Reference]: {
    name: 'Reference',
    value: DataType.Reference,
    description: '',
  },
  [DataType.QRCode]: {
    name: 'QRCode',
    value: DataType.QRCode,
    description: '',
  },
  [DataType.Tag]: {
    name: 'Tag',
    value: DataType.Tag,
    description: '',
  },
  [DataType.Json]: {
    name: 'Json',
    value: DataType.Json,
    description: '',
  },
  [DataType.Array]: {
    name: 'Array',
    value: DataType.Array,
    description: '',
  },
  [DataType.ArrayMedia]: {
    name: 'Array Media',
    value: DataType.ArrayMedia,
    description: '',
  },
  [DataType.ArrayRadio]: {
    name: 'Array Radio',
    value: DataType.ArrayRadio,
    description: '',
  },
};
