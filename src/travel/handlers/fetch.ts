/**
 * @author WMXPY
 * @namespace Travel_Handler
 * @description Fetch
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AccountEnsureRequest, verifyAccount } from "../../common/account";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { AccountModel } from "../../model/account";
import { createLambdaResponse } from "../../util/lambda";
import { fetchTravelDestinationRoute } from "../routes/fetch";

export type FetchTravelDestinationHandlerRequest = {
} & AccountEnsureRequest;

export const fetchTravelDestinationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(HTTP_RESPONSE_CODE.BAD_REQUEST, 'No Body');
    }
    const rawBody: FetchTravelDestinationHandlerRequest = JSON.parse(event.body);
    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const account: AccountModel | null = await verifyAccount(rawBody);

        if (!account) {
            return createLambdaResponse(HTTP_RESPONSE_CODE.UNAUTHORIZED, 'Authorization');
        }

        const result: Record<string, any> = await fetchTravelDestinationRoute();

        return createLambdaResponse(HTTP_RESPONSE_CODE.OK, result, account);
    } catch (error) {

        return createLambdaResponse(HTTP_RESPONSE_CODE.BAD_REQUEST, error.message);
    } finally {

        await closeDatabase();
    }
};
