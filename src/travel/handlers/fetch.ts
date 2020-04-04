/**
 * @author WMXPY
 * @namespace Travel_Handler
 * @description Fetch
 */

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AccountEnsureRequest, ensureAccount } from "../../common/account";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { AccountModel } from "../../model/account";
import { createLambdaResponse } from "../../util/lambda";
import { fetchTravelDestinationRoute } from "../routes/fetch";

export type FetchTravelDestinationHandlerRequest = {
} & AccountEnsureRequest;

export const fetchTravelDestinationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: FetchTravelDestinationHandlerRequest = JSON.parse(event.body);
    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const account: AccountModel = await ensureAccount(rawBody);

        const result: Record<string, any> = await fetchTravelDestinationRoute();

        return createLambdaResponse(200, result, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
