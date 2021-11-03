import { MixApiService } from '../infrastructure/axios/api';
export class MixAuthenticationService extends MixApiService {
    constructor(config) {
        super(config);
        this.userLogin = this.userLogin.bind(this);
    }
    userLogin(credentials) {
        return this.post('security/login', credentials).then(this.success);
    }
}
export const userApi = new MixAuthenticationService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LWF1dGhlbnRpY2F0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9taXhsaWIvc3JjL2xpYi9zZXJ2aWNlcy9taXgtYXV0aGVudGljYXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFNUQsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGFBQWE7SUFDekQsWUFBbUIsTUFBMkI7UUFDNUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sU0FBUyxDQUFDLFdBQXVCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxnQkFBZ0IsRUFDaEIsV0FBVyxDQUNaLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDIn0=