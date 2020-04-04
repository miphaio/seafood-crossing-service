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
        };
    }

    destination.addOccupancy(account._id);
    await destination.save();

    return {
        succeed: true,
        accessCode: destination.accessCode,
    };
};
