/**
 * @author WMXPY
 * @namespace Travel
 * @description Handler
 */

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';

export const createTravelDestination: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            input: event,
            env: process.env.SEAFOOD_CROSSING_DATABASE,
        }, null, 2),
    };
};
