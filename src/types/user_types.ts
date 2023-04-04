import { ObjectId } from "mongoose";
export const PENDING: string = 'PENDING';
export const ACTIVE: string = 'ACTIVE';
export const INACTIVE: string = 'INACTIVE';
export const DELETED: string = 'DELETED';
export const U_AC_STATUS = [PENDING, ACTIVE, INACTIVE, DELETED];

export const PROVIDER_VERIFIED = 'VERIFIED';
export const PROVIDER_INACTIVE = 'INACTIVE';
export const PROVIDER_PENDING = 'PENDING';
export const PROVIDER_STATUS = [PROVIDER_VERIFIED, PROVIDER_INACTIVE, PROVIDER_PENDING];



export interface ITokenBody {
    _id: ObjectId;
    email: string;
}

export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    number: string;
    status: string;
    provider: string;
    save(): unknown;
    token: string | null;
}
