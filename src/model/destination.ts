/**
 * @author WMXPY
 * @namespace Model
 * @description Destination
 */

import { Document, model, Model, Schema } from "mongoose";
import { DestinationEntity } from "../entity/destination";

const DestinationSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
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

export type DestinationModel = {
} & DestinationEntity & Document;

export const DestinationModel: Model<DestinationModel> = model<DestinationModel>('Destination', DestinationSchema);
