/**
 * @author WMXPY
 * @namespace Travel_Routes
 * @description Visit
 */

import { AccountModel } from "../../model/account";
import { DestinationModel } from "../../model/destination";
import { getDestinationById } from "../../service/destination";
import { ERROR_CODE, panic } from "../../util/panic";

export type VisitTravelDestinationRequest = {

    readonly destinationId: string;
};

export type VisitTravelDestinationResponse = {

    readonly succeed: boolean;
    readonly occupanciesCount: number;
    readonly reportCount: number;
    readonly accessCode?: string;
};

export const visitTravelDestinationRoute = async (account: AccountModel, request: VisitTravelDestinationRequest): Promise<VisitTravelDestinationResponse> => {

    const destination: DestinationModel | null = await getDestinationById(request.destinationId);

    if (!destination) {
        throw panic.code(ERROR_CODE.DESTINATION_NOT_FOUND, request.destinationId);
    }

    const occupanciesCount: number = destination.updateOccupanciesLength();

    if (occupanciesCount >= destination.capacity) {

        return {
            succeed: false,
            occupanciesCount,
            reportCount: destination.reports.length,
        };
    }

    for (const occupancy of destination.occupancies) {
        if (occupancy._account.equals(account._id)) {
            return {
                succeed: true,
                accessCode: destination.accessCode,
                occupanciesCount,
                reportCount: destination.reports.length,
            };
        }
    }

    destination.addOccupancy(account._id);
    await destination.save();

    return {
        succeed: true,
        accessCode: destination.accessCode,
        occupanciesCount: destination.occupanciesLength,
        reportCount: destination.reports.length,
    };
};
