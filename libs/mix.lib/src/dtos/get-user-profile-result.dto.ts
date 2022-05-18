import { MixUser } from "../models/src/user.model";

export interface IGetUserProfileResult {
    user: MixUser;
    isChangePassword: boolean;
}