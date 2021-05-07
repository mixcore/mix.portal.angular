import { LocalStorageKeys } from '../constants/local-storage-keys';
import { apiService } from '../infrastructure/axios/api';
import { GlobalSetting } from '../models/setting.models';
export class MixSettingService {
    /**
     *
     */
    constructor() {
        this.cachedInMinutes = 20;
        this.getAllSettings();
    }
    getAllSettings(culture) {
        this.localizeSettings = localStorage.getItem(LocalStorageKeys.CONF_LOCAL_SETTINGS);
        this.globalSettings = JSON.parse(localStorage.getItem(LocalStorageKeys.CONF_GLOBAL_SETTINGS) || '{}');
        this.translator = localStorage.getItem(LocalStorageKeys.CONF_TRANSLATOR);
        if (this.isRenewSettings()) {
            let url = `/rest/shared${culture ? `/${culture}` : ''}/get-shared-settings`;
            apiService.get(url).then((response) => {
                var resp = response;
                this.globalSettings = resp.globalSettings || new GlobalSetting();
                this.localizeSettings = resp.localizeSettings;
                this.translator = resp.translator;
                localStorage.setItem(LocalStorageKeys.CONF_GLOBAL_SETTINGS, JSON.stringify(this.globalSettings));
                localStorage.setItem(LocalStorageKeys.CONF_LOCAL_SETTINGS, JSON.stringify(this.localizeSettings));
                localStorage.setItem(LocalStorageKeys.CONF_TRANSLATOR, JSON.stringify(this.translator));
                localStorage.setItem(LocalStorageKeys.CONF_LAST_SYNC_CONFIGURATION, this.globalSettings.lastUpdateConfiguration.toString() || '');
            });
        }
    }
    setAppUrl(appUrl) {
        apiService.setAppUrl(appUrl);
    }
    isRenewSettings() {
        let now = new Date();
        let lastSync = localStorage.getItem(LocalStorageKeys.CONF_LAST_SYNC_CONFIGURATION);
        var d = new Date(lastSync || '');
        d.setMinutes(d.getMinutes() + 20);
        return (!this.localizeSettings ||
            !this.globalSettings ||
            !this.translator ||
            !lastSync ||
            now > d);
    }
}
export const mixSettingService = new MixSettingService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXNldHRpbmctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21peC5saWIudHMvc3JjL2xpYi9zZXJ2aWNlcy9taXgtc2V0dGluZy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQXVCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTlFLE1BQU0sT0FBTyxpQkFBaUI7SUFLNUI7O09BRUc7SUFDSDtRQVBPLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBUWxDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ00sY0FBYyxDQUFDLE9BQWdCO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUMxQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FDM0IsQ0FBQztRQUNaLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FDbkQsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQ3BDLGdCQUFnQixDQUFDLGVBQWUsQ0FDdkIsQ0FBQztRQUVaLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzFCLElBQUksR0FBRyxHQUFHLGVBQ1IsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUM1QixzQkFBc0IsQ0FBQztZQUN2QixVQUFVLENBQUMsR0FBRyxDQUFzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxJQUFJLEdBQUcsUUFBK0IsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbEMsWUFBWSxDQUFDLE9BQU8sQ0FDbEIsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUNwQyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLGdCQUFnQixDQUFDLG1CQUFtQixFQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUN0QyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLGdCQUFnQixDQUFDLGVBQWUsRUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQ2hDLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLE9BQU8sQ0FDbEIsZ0JBQWdCLENBQUMsNEJBQTRCLEVBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUM3RCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTSxTQUFTLENBQUMsTUFBYztRQUM3QixVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FDakMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQzlDLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUN0QixDQUFDLElBQUksQ0FBQyxjQUFjO1lBQ3BCLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDaEIsQ0FBQyxRQUFRO1lBQ1QsR0FBRyxHQUFHLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=