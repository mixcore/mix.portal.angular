import { MixTemplateFolder } from '../../enums/mix-template-folder.enum';
import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';
import { ISeoBase } from '../base/seo-base.model';
import { MixModuleReferenceModel } from './mix-module-reference.model';

export interface MixPagePortalModel
  extends IMixPolymopheusContent,
    IEntityBase<number>,
    ISeoBase {
  template?: {
    id: number;
    mixThemeId: number;
    folderType: MixTemplateFolder;
  };
  excerpt?: string;
  content?: string;
  views?: number;
  type?: string;
  publishedDateTime?: Date;
  tags?: string;
  moduleNavs?: MixModuleReferenceModel[];
  templateId?: number;
}
