/**
 * @author WMXPY
 * @namespace Travel
 * @description Handler
 */

import { Safe, SafeExtract } from "@sudoo/extract";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DeviceInformation } from '../entity/account';
import { createTravelDestinationRoute, CreateTravelDestinationRouteRequest } from './routes/create';

export const createTravelDestination: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No Body',
            }),
        };
    }
    const rawBody: Record<string, any> = JSON.parse(event.body);
    const body: SafeExtract<CreateTravelDestinationRouteRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    try {

        const identifier: string = body.directEnsure('identifier');
        const device: DeviceInformation = body.directVerify('device', (device: DeviceInformation) => Boolean(device.matcher) && Boolean(device.model));

        const accessCode: string = body.directEnsure('accessCode');

        const result: Record<string, any> = await createTravelDestinationRoute({
            identifier,
            device,
            accessCode,
        });

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch (error) {

        return {
            statusCode: 400,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }
};
