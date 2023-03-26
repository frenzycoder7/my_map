import { ILocation } from "@dataTypes";
import { LocationModelName, UserModelName } from "@modelnames";
import { Model, Schema, model } from "mongoose";

export const locationSchema: Schema<ILocation> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModelName,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

export const LocationModel: Model<ILocation> = model(LocationModelName, locationSchema);