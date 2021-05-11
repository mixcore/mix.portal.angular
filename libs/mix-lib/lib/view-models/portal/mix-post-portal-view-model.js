import { MixModelType } from '../../enums/mix-enums';
import { ViewModelBase } from '../../infrastructure/base/view-model-base';
export class MixPostPortalViewModel extends ViewModelBase {
    constructor() {
        super(MixModelType.Post);
    }
    parseModel() {
        const post = {
            id: this.id,
            title: this.title,
            createdDateTime: this.createdDateTime,
        };
        return post;
    }
    parseView(model) {
        this.id = model.id;
        this.title = model.title;
        this.createdDateTime = model.createdDateTime;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXBvc3QtcG9ydGFsLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9taXgubGliLnRzL3NyYy9saWIvdmlldy1tb2RlbHMvcG9ydGFsL21peC1wb3N0LXBvcnRhbC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFHMUUsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGFBQWlDO0lBaUIzRTtRQUNFLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQWxCRCxVQUFVO1FBQ1IsTUFBTSxJQUFJLEdBQXVCO1lBQy9CLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBWTtZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3RDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxTQUFTLENBQUMsS0FBeUI7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQztDQU9GIn0=