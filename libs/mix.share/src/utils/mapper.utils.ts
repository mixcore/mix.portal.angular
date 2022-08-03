import { MixPostPortalModel, MixPostReferenceModel } from '@mix-spa/mix.lib';

export class Mapper {
  public static PostToPostReference(
    post: MixPostPortalModel
  ): MixPostReferenceModel {
    return <MixPostReferenceModel>{};
  }
}
