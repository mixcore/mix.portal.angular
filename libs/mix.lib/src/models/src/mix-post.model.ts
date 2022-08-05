import { MixTemplateFolder } from '../../enums/mix-template-folder.enum';
import { IEntityBase } from '../base/entity-base.model';
import { IMixPolymopheusContent } from '../base/mix-polymopheus-conent.model';
import { ISeoBase } from '../base/seo-base.model';
import { MixModuleReferenceModel } from './mix-module-reference.model';
import { MixPostReferenceModel } from './mix-post-reference.model';

export interface MixPostPortalModel
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
  templateId?: number;
  moduleNavs?: MixModuleReferenceModel[];
  postNavs?: MixPostReferenceModel[];
}
