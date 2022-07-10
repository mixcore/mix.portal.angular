import { MixTemplateFolder } from '../../enums';
import { IEntityBase } from '../base/entity-base.model';

export interface MixTemplateModel extends IEntityBase<number> {
  id: number;
  extension: string;
  fileFolder: string;
  fileName: string;
  folderType: MixTemplateFolder;
  isValid: boolean;
  mixTenantId: number;
  mixThemeId: number;
  mixThemeName: string;
  priority: number;
  content: string;
  scripts: string;
  styles: string;
}
