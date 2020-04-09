/**
 * @author WMXPY
 * @namespace Travel_Handler
 * @description Visit
 */

import { Safe, SafeExtract } from '@sudoo/extract';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AccountEnsureRequest, verifyAccount } from "../../common/account";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { AccountModel } from "../../model/account";
import { createLambdaResponse } from "../../util/lambda";
import { VisitTravelDestinationRequest, VisitTravelDestinationResponse, visitTravelDestinationRoute } from "../routes/visit";

export type VisitTravelDestinationHandlerRequest = {
} & VisitTravelDestinationRequest & AccountEnsureRequest;

export const visitTravelDestinationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: VisitTravelDestinationHandlerRequest = JSON.parse(event.body);
    const body: SafeExtract<VisitTravelDestinationRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const destinationId: string = body.directEnsure('destinationId');

        const account: AccountModel | null = await verifyAccount(rawBody);

        if (!account) {
            return createLambdaResponse(403, 'Authorization');
        }

        const result: VisitTravelDestinationResponse = await visitTravelDestinationRoute(account, {
            destinationId,
        });

        return createLambdaResponse(200, result, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
