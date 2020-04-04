/**
 * @author WMXPY
 * @namespace Travel_Routes
 * @description Create
 */

import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { DeviceInformation } from "../../entity/account";
import { AccountModel } from "../../model/account";
import { DestinationModel } from "../../model/destination";
import { createOrGetAccount } from "../../service/account";
import { createUnsavedDestination } from "../../service/destination";

export type CreateTravelDestinationRouteRequest = {

    readonly identifier: string;
    readonly device: DeviceInformation;

    readonly accessCode: string;
};

export const createTravelDestinationRoute = async (request: CreateTravelDestinationRouteRequest): Promise<Record<string, any>> => {

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    const account: AccountModel = await createOrGetAccount(request.identifier, request.device);

    const destination: DestinationModel = createUnsavedDestination(account._id, request.accessCode);

    await destination.save();
    await closeDatabase();

    return {
        created: true,
    };
};
