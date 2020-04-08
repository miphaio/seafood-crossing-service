/**
 * @author WMXPY
 * @namespace Travel_Handler
 * @description Create
 */

import { Safe, SafeExtract } from "@sudoo/extract";
import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AccountEnsureRequest, ensureAccount } from "../../common/account";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { DESTINATION_CATEGORY, verifyDestinationCategory } from "../../declare/destination";
import { AccountModel } from "../../model/account";
import { createLambdaResponse } from "../../util/lambda";
import { CreateTravelDestinationRequest, createTravelDestinationRoute } from "../routes/create";

export type CreateTravelDestinationHandlerRequest = {
} & CreateTravelDestinationRequest & AccountEnsureRequest;

export const createTravelDestinationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: CreateTravelDestinationHandlerRequest = JSON.parse(event.body);
    const body: SafeExtract<CreateTravelDestinationRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const category: DESTINATION_CATEGORY = body.directVerify('category', verifyDestinationCategory);
        const title: string = body.directEnsure('title');
        const description: string = body.directEnsure('description');
        const accessCode: string = body.directEnsure('accessCode');

        const account: AccountModel = await ensureAccount(rawBody);

        const result: Record<string, any> = await createTravelDestinationRoute(account, {
            category,
            title,
            description,
            accessCode,
            duration: TIME_IN_MILLISECONDS.HALF_HOUR,
        });

        return createLambdaResponse(200, result, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
