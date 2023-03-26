import { IUser } from "@dataTypes";
import { UserModelName } from "@modelnames";
import { Model, Schema, model } from "mongoose";

export const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        index: true,
    }
}, {
    timestamps: true,
});

export const UserModel: Model<IUser> = model(UserModelName, userSchema);