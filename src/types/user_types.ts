import { ObjectId } from "mongoose";
export const PENDING: string = 'PENDING';
export const ACTIVE: string = 'ACTIVE';
export const INACTIVE: string = 'INACTIVE';
export const DELETED: string = 'DELETED';



export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    token: string;
}

export interface ITokenBody {
    _id: ObjectId;
    email: string;
}

export interface ILocation {
    user: ObjectId;
    latitude: number;
    longitude: number;
}