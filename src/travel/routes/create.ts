/**
 * @author WMXPY
 * @namespace Travel_Routes
 * @description Create
 */

import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { AccountModel } from "../../model/account";
import { DestinationModel } from "../../model/destination";
import { createUnsavedDestination } from "../../service/destination";

export type CreateTravelDestinationRequest = {

    readonly title: string;
    readonly description: string;

    readonly accessCode: string;
    readonly duration: number;
};

export const createTravelDestinationRoute = async (account: AccountModel, request: CreateTravelDestinationRequest): Promise<Record<string, any>> => {

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    const destination: DestinationModel = createUnsavedDestination(account._id, {
        accessCode: request.accessCode,
        title: request.title,
        description: request.description,
        duration: TIME_IN_MILLISECONDS.MINUTE * 5,
        capacity: 8,
    });

    await destination.save();
    await closeDatabase();

    return {
        created: true,
    };
};
