/**
 * @author WMXPY
 * @namespace Travel
 * @description Handler
 */

import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';

export const example: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Cool',
            input: event,
        }, null, 2),
    };
};
