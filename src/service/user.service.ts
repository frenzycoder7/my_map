import { IUser } from "@dataTypes";
import { UserModel } from "@models";

export const registerUserService = async (data: IUser): Promise<IUser> => {
    let user: IUser = await UserModel.create(data);
    return user;
}

export const getUserService = async (query:any): Promise<IUser | null> => {
    let user: IUser | null = await UserModel.findOne(query);
    return user;
}

export const updateUserService = async (query: any, data: IUser): Promise<IUser | null> => {
    let user:IUser | null = await UserModel.findOneAndUpdate(query, data);
    return user;
}