import { IUser, PENDING, PROVIDER_PENDING, PROVIDER_STATUS, U_AC_STATUS } from "@dataTypes";
import { UserModelName } from "@modelnames";
import { Schema, model } from "mongoose";

export const userStructure =  {
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    number:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        default: PROVIDER_PENDING,
        enum: PROVIDER_STATUS,
    },
    status: {
        type: String,
        required: true,
        default: PENDING,
        enum: U_AC_STATUS,
    },
    token: {
        type: String,
    }
};

export const userSchema:Schema<IUser> = new Schema(userStructure,{
    timestamps: true,
});
export const UserModel = model<IUser>(UserModelName, userSchema);