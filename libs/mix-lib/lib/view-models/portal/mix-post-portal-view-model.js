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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXBvc3QtcG9ydGFsLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9taXgubGliLnRzL3NyYy9saWIvdmlldy1tb2RlbHMvcG9ydGFsL21peC1wb3N0LXBvcnRhbC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFHMUUsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGFBQWlDO0lBSTNFO1FBQ0UsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sSUFBSSxHQUF1QjtZQUMvQixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQVk7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUN0QyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQXlCO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7Q0FDRiJ9