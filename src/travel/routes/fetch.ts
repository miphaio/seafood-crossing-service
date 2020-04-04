/**
 * @author WMXPY
 * @namespace Travel_Routes
 * @description Fetch
 */

import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { DeviceInformation } from "../../entity/account";
import { AccountModel } from "../../model/account";
import { DestinationModel } from "../../model/destination";
import { createOrGetAccount } from "../../service/account";
import { fetchActiveAvailableDestinations } from "../../service/destination";

export type FetchTravelDestinationRequest = {

    readonly identifier: string;
    readonly device: DeviceInformation;
};

export type FetchTravelDestinationElement = {

    readonly title: string;
    readonly description: string;
    readonly accessCode: string;

    readonly occupanciesLength: number;
    readonly reportLength: number;
};

export const fetchTravelDestinationRoute = async (request: FetchTravelDestinationRequest): Promise<Record<string, any>> => {

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    const account: AccountModel = await createOrGetAccount(request.identifier, request.device);

    const destinations: DestinationModel[] = await fetchActiveAvailableDestinations(8);

    const mapped: FetchTravelDestinationElement[] = [];

    for (const destination of destinations) {
        mapped.push({
            title: destination.title,
            description: destination.description,
            accessCode: destination.accessCode,
            occupanciesLength: destination.occupancies.length,
            reportLength: destination.reports.length,
        });
    }

    await closeDatabase();

    return {
        identifier: account.identifier,
        destinations: mapped,
    };
};
