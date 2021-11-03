import { LocalStorageKeys } from '../../constants/local-storage-keys';
import { MixViewModelTypes } from '../../enums/mix-enums';
import { getDefaultAxiosConfiguration } from '../../helpers/mix-helper';
import { MixRepository } from '../../infrastructure/base/mix-repository';
export class MixPortalRepository extends MixRepository {
    constructor(modelName) {
        const appUrl = localStorage.getItem(LocalStorageKeys.CONF_APP_URL) ||
            window.location.origin;
        const specificulture = localStorage.getItem(LocalStorageKeys.CONF_CURRENT_CULTURE);
        const viewName = MixViewModelTypes.Mvc;
        const conf = getDefaultAxiosConfiguration();
        conf.baseURL = appUrl;
        conf.withCredentials = false;
        super(appUrl, modelName, viewName, specificulture, conf);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXBvcnRhbC1yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbWl4bGliL3NyYy9saWIvcmVwb3NpdG9yaWVzL3BvcnRhbC9taXgtcG9ydGFsLXJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFnQixpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUV6RSxNQUFNLE9BQU8sbUJBQXVCLFNBQVEsYUFBZ0I7SUFDMUQsWUFBWSxTQUF1QjtRQUNqQyxNQUFNLE1BQU0sR0FDVixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztZQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN6QixNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUN6QyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FDdEMsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyw0QkFBNEIsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGIn0=