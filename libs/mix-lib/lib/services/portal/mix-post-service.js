import { MixModelType } from '../../enums/mix-enums';
import { MixRestPortalService } from '../base/mix-rest-portal-service';
export class PostService extends MixRestPortalService {
    constructor() {
        super(MixModelType.Post);
    }
    // override base getSingleModel if need.
    getSingleModel(id) {
        let queries = {
            kw: 'test',
        };
        return super.getSingleModel(id, queries);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXBvc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21peC5saWIudHMvc3JjL2xpYi9zZXJ2aWNlcy9wb3J0YWwvbWl4LXBvc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFdkUsTUFBTSxPQUFPLFdBQVksU0FBUSxvQkFBZ0M7SUFDL0Q7UUFDRSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBd0M7SUFDakMsY0FBYyxDQUFDLEVBQU87UUFDM0IsSUFBSSxPQUFPLEdBQUc7WUFDWixFQUFFLEVBQUUsTUFBTTtTQUNYLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRiJ9