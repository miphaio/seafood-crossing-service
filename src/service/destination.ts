/**
 * @author WMXPY
 * @namespace Service
 * @description Destination
 */

import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { ObjectID } from "bson";
import { DestinationConfig } from "../entity/destination";
import { DestinationModel } from "../model/destination";

export const createUnsavedDestination = (accountId: ObjectID, accessCode: string): DestinationModel => {

    const config: DestinationConfig = {
        _account: accountId,
        accessCode,
        capacity: 8,
        duration: TIME_IN_MILLISECONDS.MINUTE * 5,
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
