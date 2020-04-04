/**
 * @author WMXPY
 * @namespace Travel
 * @description Handler
 */

import { Safe, SafeExtract } from "@sudoo/extract";
import { TIME_IN_MILLISECONDS } from "@sudoo/magic";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeviceInformation, verifyDeviceInformationFunction } from '../entity/account';
import { createLambdaResponse } from "../util/lambda";
import { createTravelDestinationRoute, CreateTravelDestinationRequest } from './routes/create';
import { fetchTravelDestinationRoute } from "./routes/fetch";

export const createTravelDestination: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: Record<string, any> = JSON.parse(event.body);
    const body: SafeExtract<CreateTravelDestinationRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    try {

        const identifier: string = body.directEnsure('identifier');
        const device: DeviceInformation = body.directVerify('device', verifyDeviceInformationFunction);

        const title: string = body.directEnsure('title');
        const description: string = body.directEnsure('description');

        const accessCode: string = body.directEnsure('accessCode');

        const result: Record<string, any> = await createTravelDestinationRoute({
            identifier,
            device,
            title,
            description,
            accessCode,
            duration: TIME_IN_MILLISECONDS.HALF_HOUR,
        });

        return createLambdaResponse(200, result);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    }
};

export const fetchTravelDestination: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: Record<string, any> = JSON.parse(event.body);
    const body: SafeExtract<CreateTravelDestinationRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    try {

        const identifier: string = body.directEnsure('identifier');
        const device: DeviceInformation = body.directVerify('device', verifyDeviceInformationFunction);

        const result: Record<string, any> = await fetchTravelDestinationRoute({
            identifier,
            device,
        });

        return createLambdaResponse(200, result);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    }
};
