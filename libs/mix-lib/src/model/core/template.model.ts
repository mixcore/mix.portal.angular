import { PaginationRequestModel } from '../pagination-request.model';

export enum MixTemplateFolder {
  Layouts = 'Layouts',
  Pages = 'Pages',
  Modules = 'Modules',
  Forms = 'Forms',
  Edms = 'Edms',
  Posts = 'Posts',
  Widgets = 'Widgets',
  Masters = 'Masters',
}

export interface MixTemplate {
  mixTenantId: number;
  content: string;
  extension: string;
  fileFolder: string;
  fileName: string;
  folderType: string;
  scripts: string;
  styles: string;
  mixThemeName: string;
  mixThemeId: number;
  id: number;
  createdDateTime: Date;
  createdBy: string;
  priority: number;
  isValid: boolean;
  status: string;
  errors: string[];
}

export interface GetTemplatesRequest extends PaginationRequestModel {
  themeId: number;
  folderType: MixTemplateFolder;
}
