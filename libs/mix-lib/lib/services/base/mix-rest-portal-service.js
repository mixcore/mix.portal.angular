import { CONF_APP_URL, CONF_CURRENT_CULTURE, } from '../../constants/local-storage-keys';
import { getDefaultAxiosConfiguration } from '../../helpers/mix-helper';
import { MixRestService } from './mix-rest-service';
export class MixRestPortalService extends MixRestService {
    constructor(modelName) {
        let appUrl = localStorage.getItem(CONF_APP_URL) || window.location.origin; //'https://store.mixcore.org/api/v1/rest/';
        let specificulture = localStorage.getItem(CONF_CURRENT_CULTURE);
        let viewName = 'mvc';
        var conf = getDefaultAxiosConfiguration();
        conf.withCredentials = false;
        super(appUrl, modelName, viewName, specificulture, conf);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXJlc3QtcG9ydGFsLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9taXgubGliLnRzL3NyYy9saWIvc2VydmljZXMvYmFzZS9taXgtcmVzdC1wb3J0YWwtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixHQUNyQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxNQUFNLE9BQU8sb0JBQXdCLFNBQVEsY0FBaUI7SUFDNUQsWUFBWSxTQUFpQjtRQUMzQixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsMkNBQTJDO1FBQ3RILElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLEdBQUcsNEJBQTRCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDRiJ9