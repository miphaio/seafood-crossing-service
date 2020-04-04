/**
 * @author WMXPY
 * @namespace Util
 * @description Lambda
 */

import { APIGatewayProxyResult } from "aws-lambda";

export const createLambdaResponse = (
    code: number,
    body: Record<string, string> | string | number | boolean,
): APIGatewayProxyResult => {

    if (typeof body === 'string'
        && typeof body === 'number'
        && typeof body === 'boolean') {

        return {
            statusCode: code,
            body: JSON.stringify({
                message: body,
            }),
        }
    }

    return {
        statusCode: code,
        body: JSON.stringify(body),
    };
};
