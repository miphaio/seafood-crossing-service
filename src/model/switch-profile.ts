/**
 * @author WMXPY
 * @namespace Model
 * @description Switch Profile
 */

import { Document, model, Model, Schema } from "mongoose";
import { SwitchProfileEntity } from "../entity/switch-profile";

const SwitchProfileSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
            index: true,
        },
        profileIdentifier: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export type SwitchProfileModel = {
} & SwitchProfileEntity & Document;

export const SwitchProfileModel: Model<SwitchProfileModel> = model<SwitchProfileModel>('SwitchProfile', SwitchProfileSchema);
