import { MixModelType } from '../../enums/mix-enums';
import { ViewModelBase } from '../../infrastructure/base/view-model-base';
export class MixPostPortalViewModel extends ViewModelBase {
    constructor(model) {
        super(MixModelType.Post, model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXBvc3QtcG9ydGFsLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9taXhsaWIvc3JjL2xpYi92aWV3LW1vZGVscy9wb3J0YWwvbWl4LXBvc3QtcG9ydGFsLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUcxRSxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsYUFBaUM7SUFJM0UsWUFBWSxLQUEwQjtRQUNwQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sSUFBSSxHQUF1QjtZQUMvQixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQVk7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUN0QyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQXlCO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7Q0FDRiJ9