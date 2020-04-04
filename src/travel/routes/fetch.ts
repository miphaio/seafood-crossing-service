/**
 * @author WMXPY
 * @namespace Travel_Routes
 * @description Fetch
 */

import { DestinationModel } from "../../model/destination";
import { fetchActiveAvailableDestinations } from "../../service/destination";

export type FetchTravelDestinationElement = {

    readonly destinationId: string;

    readonly title: string;
    readonly description: string;
    readonly accessCode: string;

    readonly occupanciesLength: number;
    readonly reportLength: number;
};

export const fetchTravelDestinationRoute = async (): Promise<Record<string, any>> => {

    const destinations: DestinationModel[] = await fetchActiveAvailableDestinations(8);

    const mapped: FetchTravelDestinationElement[] = [];

    for (const destination of destinations) {
        mapped.push({
            destinationId: destination._id.toString(),
            title: destination.title,
            description: destination.description,
            accessCode: destination.accessCode,
            occupanciesLength: destination.occupancies.length,
            reportLength: destination.reports.length,
        });
    }

    return {
        destinations: mapped,
    };
};
