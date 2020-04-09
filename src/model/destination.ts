/**
 * @author WMXPY
 * @namespace Model
 * @description Destination
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { DESTINATION_CATEGORY_LIST } from "../declare/destination";
import { DestinationEntity, DestinationOccupancy } from "../entity/destination";

const OccupancySchema = new Schema({

    at: {
        type: Date,
        required: true,
    },
    _account: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { _id: false });

const ReportSchema = new Schema({

    at: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    _account: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { _id: false });

const DestinationSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
            index: true,
        },
        _account: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: DESTINATION_CATEGORY_LIST,
            required: true,
        },
        accessCode: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        expireAt: {
            type: Date,
            required: true,
        },
        occupancies: {
            type: [OccupancySchema],
            required: true,
            default: [],
        },
        occupanciesLength: {
            type: Number,
            required: true,
            default: 0,
            index: true,
        },
        reports: {
            type: [ReportSchema],
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

export type DestinationModel = {
    updateOccupanciesLength(): number;
    addOccupancy(account: ObjectID): DestinationModel;
} & DestinationEntity & Document;

DestinationSchema.methods.updateOccupanciesLength = function (this: DestinationModel): number {

    const now: number = Date.now();
    const occupanciesCount: number = this.occupancies.reduce((previous: number, current: DestinationOccupancy) => {
        const at: number = current.at.getTime();
        const expireAt: number = at + this.duration;

        if (expireAt < now) {
            return previous + 1;
        }
        return previous;
    }, 0);

    this.occupanciesLength = occupanciesCount;
    return occupanciesCount;
};

DestinationSchema.methods.addOccupancy = function (this: DestinationModel, account: ObjectID): DestinationModel {

    this.occupancies = [
        ...this.occupancies,
        {
            at: new Date(),
            _account: account,
        }
    ]
    this.occupanciesLength = this.occupanciesLength + 1;
    return this;
};

export const DestinationModel: Model<DestinationModel> = model<DestinationModel>('Destination', DestinationSchema);
