import {
  DataType,
  DataTypeUi,
  MixColumn,
  MixDynamicData,
  MixDynamicDataValue,
} from '@mixcore/lib/model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

export class Utils {
  public static SUPPORTED_DATA_TYPE = [
    DataType.Text,
    DataType.Custom,
    DataType.Double,
    DataType.DateTime,
    DataType.Date,
    DataType.Url,
    DataType.Boolean,
    DataType.Integer,
    DataType.Html,
    DataType.Upload,
    DataType.Json,
    DataType.ArrayMedia,
    DataType.ArrayRadio,
    DataType.Array,
    DataType.Color,
    DataType.QRCode,
  ];

  public static isDifferent<T>(value1: T, value2: T): boolean {
    if (value1 == null && value2 == null) {
      return false;
    }
    if (value1 == null && value2 != null) {
      return true;
    }
    if (value1 != null && value2 == null) {
      return true;
    }
    if (typeof value1 !== 'object' && typeof value2 !== 'object') {
      return value1 !== value2;
    }
    if (value1 instanceof Array && value2 instanceof Array) {
      if (value1.length !== value2.length) {
        return true;
      }
    }
    return JSON.stringify(value1) !== JSON.stringify(value2);
  }

  public static clean(obj: any) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  public static BuildDynamicFormField(
    columns: MixColumn[],
    data: MixDynamicData,
    uploadFileFn?: (file: File) => Observable<string>,
    deleteFileFn?: (fileName: string) => Observable<void>
  ): {
    model: MixDynamicData;
    fields: FormlyFieldConfig[];
  } {
    const model: MixDynamicData = data;
    const fields: FormlyFieldConfig[] = [];

    columns
      .filter((c) => Utils.SUPPORTED_DATA_TYPE.includes(c.dataType))
      .sort((a, b) => {
        if (
          a.dataType === DataType.ArrayMedia &&
          b.dataType === DataType.ArrayMedia
        )
          return 0;

        if (
          a.dataType === DataType.ArrayMedia &&
          b.dataType !== DataType.ArrayMedia
        )
          return 1;

        if (
          a.dataType !== DataType.ArrayMedia &&
          b.dataType === DataType.ArrayMedia
        )
          return -1;

        return a.priority - b.priority;
      })
      .forEach((c) => {
        let data = model[c.systemName];
        let dataType: DataType | DataTypeUi = c.dataType;

        if (c.dataType === DataType.Date || c.dataType === DataType.DateTime) {
          if (!data) {
            model[c.systemName] = null;
          } else {
            if (
              typeof data == 'string' &&
              data.indexOf('Z') === -1 &&
              data.indexOf('+') === -1
            ) {
              data += 'Z';
            }

            model[c.systemName] = new Date(data as string);
          }
        }

        if (c.dataType === DataType.ArrayMedia) {
          if (typeof data === 'string') {
            model[c.systemName] = JSON.parse(model[c.systemName] as string);
          }

          if (data === null || data === undefined) {
            model[c.systemName] = [];
          }
        }

        if (
          c.dataType === DataType.Json ||
          c.dataType === DataType.ArrayRadio
        ) {
          if (typeof data === 'string') {
            model[c.systemName] = JSON.parse(model[c.systemName] as string);
          }

          if (data === null || data === undefined) {
            model[c.systemName] = {};
          }
        }

        if (c.dataType === DataType.Array) {
          if (typeof data === 'string') {
            model[c.systemName] = JSON.parse(model[c.systemName] as string);
          }

          if (data === null || data === undefined) {
            model[c.systemName] = [];
          }
        }

        if (
          c.dataType === DataType.Text &&
          c.columnConfigurations.allowedValues?.length > 0
        ) {
          dataType = DataTypeUi.TextSelect;
        }

        fields.push({
          key: c.systemName,
          type: dataType,
          props: {
            label: c.displayName,
            allowedValues: c.columnConfigurations?.allowedValues ?? [],
            uploadFn: [DataType.ArrayMedia, DataType.Upload].includes(
              c.dataType
            )
              ? uploadFileFn
              : undefined,

            deleteFileFn: [DataType.ArrayMedia, DataType.Upload].includes(
              c.dataType
            )
              ? deleteFileFn
              : undefined,
          },
        });
      });

    return { model, fields };
  }

  public static initFormFieldDefaultValue(
    dataType: DataType,
    value: MixDynamicDataValue
  ) {
    if (dataType === DataType.Date || dataType === DataType.DateTime) {
      if (!value) return null;

      if (
        typeof value == 'string' &&
        value.indexOf('Z') === -1 &&
        value.indexOf('+') === -1
      ) {
        value += 'Z';
      }

      return new Date(value as string);
    }

    if (dataType === DataType.ArrayMedia) {
      if (typeof value === 'string') value = JSON.parse(value as string);
      if (!value) return [];
    }

    if (dataType === DataType.Array) {
      if (typeof value === 'string') return JSON.parse(value as string);
      if (value === null || value === undefined) return [];
    }

    if (dataType === DataType.Json || dataType === DataType.ArrayRadio) {
      if (typeof value === 'string') return JSON.parse(value as string);
      if (!value) return {};
    }

    return value;
  }
}
