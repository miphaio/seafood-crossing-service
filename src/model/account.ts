/**
 * @author WMXPY
 * @namespace Model
 * @description Account
 */

import { Document, model, Model, Schema } from "mongoose";
import { AccountEntity } from "../entity/account";

export const DeviceSchema = new Schema({

    model: {
        type: String,
        required: true,
    },
    matcher: {
        type: String,
        required: true,
    },
}, { _id: false });

const AccountSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
            index: true,
        },
        identifier: {
            type: String,
            required: true,
            index: true,
        },
        devices: {
            type: [DeviceSchema],
            required: true,
            default: [],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export type AccountModel = {
} & AccountEntity & Document;

export const AccountModel: Model<AccountModel> = model<AccountModel>('Account', AccountSchema);
