export interface IInitAccountRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;

  // additional
  firstName?: string;
  lastName?: string;
  nickName?: string;
  returnUrl?: string;
}
