/**
 * @author WMXPY
 * @namespace Model
 * @description Account
 */

import { Document, model, Model, Schema } from "mongoose";
import { AccountEntity, DeviceInformation } from "../entity/account";

const DeviceSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
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
            unique: true,
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
    hasDevice(device: DeviceInformation): boolean;
    addDevice(device: DeviceInformation): AccountModel;
} & AccountEntity & Document;


AccountSchema.methods.hasDevice = function (this: AccountModel, target: DeviceInformation): boolean {

    for (const device of this.devices) {
        if (device.matcher === target.matcher) {
            return device.model === target.model;
        }
    }
    return false;
};

AccountSchema.methods.addDevice = function (this: AccountModel, target: DeviceInformation): boolean {

    this.devices = [
        ...this.devices,
        target,
    ];
    return false;
};

export const AccountModel: Model<AccountModel> = model<AccountModel>('Account', AccountSchema);
