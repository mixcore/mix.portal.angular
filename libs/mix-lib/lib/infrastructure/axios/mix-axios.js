import axios from 'axios';
import { LocalStorageKeys } from '../../constants/local-storage-keys';
import { getDefaultAxiosConfiguration } from '../../helpers/mix-helper';
export class MixAxios {
    constructor(conf) {
        this._initializeResponseInterceptor = () => {
            this.instance.interceptors.response.use(this._handleResponse, this._handleError);
            this.instance.interceptors.request.use(this._handleRequest, this._handleError);
        };
        this._handleRequest = (config) => {
            if (this.instance.defaults.withCredentials) {
                let token = this.getCredentialToken();
                if (token)
                    config.headers.common[LocalStorageKeys.CONF_AUTHORIZATION] = token;
            }
            return config;
        };
        this._handleResponse = ({ data }) => data;
        this._handleError = (error) => Promise.reject(error);
        let config = conf || getDefaultAxiosConfiguration();
        if (!config.baseURL) {
            config.baseURL =
                localStorage.getItem(LocalStorageKeys.CONF_APP_URL) ||
                    `${window.location.origin}/api/v1`;
        }
        this.instance = axios.create(config);
        this._initializeResponseInterceptor();
    }
    getCredentialToken() {
        let token = localStorage.getItem(LocalStorageKeys.CONF_AUTHORIZATION);
        return token
            ? `Bearer ${localStorage.getItem(LocalStorageKeys.CONF_AUTHORIZATION)}`
            : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LWF4aW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbWl4LmxpYi50cy9zcmMvbGliL2luZnJhc3RydWN0dXJlL2F4aW9zL21peC1heGlvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQTJELE1BQU0sT0FBTyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhFLE1BQU0sT0FBTyxRQUFRO0lBR25CLFlBQW1CLElBQXlCO1FBV3BDLG1DQUE4QixHQUFHLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNyQyxJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVNLG1CQUFjLEdBQUcsQ0FBQyxNQUEwQixFQUFFLEVBQUU7WUFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLEtBQUs7b0JBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDdEU7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFTSxvQkFBZSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUVsRCxpQkFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBaEM3RCxJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksNEJBQTRCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNuQixNQUFNLENBQUMsT0FBTztnQkFDWixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztvQkFDbkQsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sU0FBUyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUEwQlMsa0JBQWtCO1FBQzFCLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0RSxPQUFPLEtBQUs7WUFDVixDQUFDLENBQUMsVUFBVSxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdkUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7Q0FDRiJ9