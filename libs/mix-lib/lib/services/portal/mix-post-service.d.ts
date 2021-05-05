import { MixPostMvc } from '../../view-models/mix-post-mvc';
import { MixRestPortalService } from '../base/mix-rest-portal-service';
export declare class PostService extends MixRestPortalService<MixPostMvc> {
    constructor();
    getSingleModel(id: any): Promise<MixPostMvc>;
}
