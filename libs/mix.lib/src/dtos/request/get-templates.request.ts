import { MixTemplateFolder } from '../../enums';
import { PaginationRequestModel } from '../../models';

export interface IGetTemplatesRequest extends PaginationRequestModel {
  themeId: number;
  folderType: MixTemplateFolder;
}
