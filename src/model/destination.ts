/**
 * @author WMXPY
 * @namespace Model
 * @description Destination
 */

import { Document, model, Model, Schema } from "mongoose";
import { DestinationEntity } from "../entity/destination";

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
} & DestinationEntity & Document;

export const DestinationModel: Model<DestinationModel> = model<DestinationModel>('Destination', DestinationSchema);
