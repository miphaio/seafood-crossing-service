/**
 * @author WMXPY
 * @namespace Service
 * @description Destination
 */

import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { ObjectID } from "bson";
import { DestinationConfig } from "../entity/destination";
import { DestinationModel } from "../model/destination";

export const createUnsavedDestination = (accountId: ObjectID, options: {
    readonly accessCode: string;
    readonly title: string;
    readonly description: string;
}): DestinationModel => {

    const now: number = Date.now();
    const duration: number = TIME_IN_MILLISECONDS.MINUTE * 5;
    const expireAt: Date = new Date(now + duration);

    const config: DestinationConfig = {
        _account: accountId,
        accessCode: options.accessCode,
        title: options.title,
        description: options.description,
        capacity: 8,
        duration,
        expireAt,
    };

    return new DestinationModel(config);
};

export const fetchActiveAvailableDestinations = async (occupancyLimit: number): Promise<DestinationModel[]> => {

    const destinations: DestinationModel[] = await DestinationModel.find({
        active: true,
        occupanciesLength: {
            $lt: occupancyLimit,
        },
    });

    return destinations;
};
