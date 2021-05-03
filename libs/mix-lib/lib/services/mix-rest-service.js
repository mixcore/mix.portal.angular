import { getDefaultAxiosConfiguration } from '../helpers/mix-helper';
import { Api } from '../infrastructure/axios/api';
export class MixRestService extends Api {
    constructor(modelName, viewName, specificulture, config) {
        // NEVER FORGET THE SUPER
        config = config || getDefaultAxiosConfiguration();
        config.baseURL = `${config.baseURL}/${modelName}/${viewName}`;
        if (specificulture) {
            config.baseURL = `${config.baseURL}/${specificulture}/${modelName}/${viewName}`;
        }
        super(config);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXJlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21peC5saWIudHMvc3JjL2xpYi9zZXJ2aWNlcy9taXgtcmVzdC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRCxNQUFNLE9BQU8sY0FBZSxTQUFRLEdBQUc7SUFDckMsWUFDRSxTQUFpQixFQUNqQixRQUFnQixFQUNoQixjQUF1QixFQUN2QixNQUEyQjtRQUUzQix5QkFBeUI7UUFDekIsTUFBTSxHQUFHLE1BQU0sSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM5RCxJQUFJLGNBQWMsRUFBRTtZQUNsQixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxjQUFjLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRSxDQUFDO1NBQ2pGO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FDRiJ9