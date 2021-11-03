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
                const token = this.getCredentialToken();
                if (token)
                    config.headers.common[LocalStorageKeys.CONF_AUTHORIZATION] = token;
            }
            return config;
        };
        this._handleResponse = ({ data }) => data;
        this._handleError = (error) => Promise.reject(error);
        const config = conf || getDefaultAxiosConfiguration();
        if (!config.baseURL) {
            if (typeof window !== 'undefined') {
                // Check if local browser
                config.baseURL =
                    localStorage.getItem(LocalStorageKeys.CONF_APP_URL) ||
                        window.location.origin;
            }
        }
        this.instance = axios.create(config);
        this._initializeResponseInterceptor();
    }
    getCredentialToken() {
        const token = localStorage.getItem(LocalStorageKeys.CONF_AUTHORIZATION);
        return token
            ? `Bearer ${localStorage.getItem(LocalStorageKeys.CONF_AUTHORIZATION)}`
            : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LWF4aW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbWl4bGliL3NyYy9saWIvaW5mcmFzdHJ1Y3R1cmUvYXhpb3MvbWl4LWF4aW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBMkQsTUFBTSxPQUFPLENBQUM7QUFFaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFeEUsTUFBTSxPQUFPLFFBQVE7SUFHbkIsWUFBbUIsSUFBeUI7UUFjcEMsbUNBQThCLEdBQUcsR0FBRyxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3JDLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNwQyxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRU0sbUJBQWMsR0FBRyxDQUFDLE1BQTBCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3hDLElBQUksS0FBSztvQkFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN0RTtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVNLG9CQUFlLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBRWxELGlCQUFZLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFuQ2pFLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyx5QkFBeUI7Z0JBQ3pCLE1BQU0sQ0FBQyxPQUFPO29CQUNaLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO3dCQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUMxQjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUEwQlMsa0JBQWtCO1FBQzFCLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4RSxPQUFPLEtBQUs7WUFDVixDQUFDLENBQUMsVUFBVSxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdkUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7Q0FDRiJ9