/**
 * @author WMXPY
 * @namespace Service
 * @description Destination
 */

import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { ObjectID } from "bson";
import { DESTINATION_CATEGORY } from "../declare/destination";
import { DestinationConfig } from "../entity/destination";
import { DestinationModel } from "../model/destination";

export const createUnsavedDestination = (accountId: ObjectID, options: {
    readonly category: DESTINATION_CATEGORY,
    readonly accessCode: string;
    readonly title: string;
    readonly description: string;
    readonly duration: number;
    readonly capacity: number;
}): DestinationModel => {

    const now: number = Date.now();
    const expireAt: Date = new Date(now + TIME_IN_MILLISECONDS.HALF_HOUR);

    const config: DestinationConfig = {
        _account: accountId,
        category: options.category,
        accessCode: options.accessCode,
        title: options.title,
        description: options.description,
        duration: options.duration,
        capacity: options.capacity,
        expireAt,
    };

    return new DestinationModel(config);
};

export const getDestinationById = async (id: ObjectID | string): Promise<DestinationModel | null> => {

    const destination: DestinationModel | null = await DestinationModel.findOne({
        _id: id,
    });
    return destination;
};

export const fetchActiveAvailableDestinations = async (occupancyLimit: number): Promise<DestinationModel[]> => {

    const destinations: DestinationModel[] = await DestinationModel.find({
        active: true,
        occupanciesLength: {
            $lte: occupancyLimit + 1,
        },
        expireAt: {
            $gte: new Date(),
        },
    });

    return destinations;
};
