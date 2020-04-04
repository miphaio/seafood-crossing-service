/**
 * @author WMXPY
 * @namespace Util
 * @description Lambda
 */

import { APIGatewayProxyResult } from "aws-lambda";
import { AccountModel } from "../model/account";

export const createLambdaResponse = (
    code: number,
    body: Record<string, any> | string | number | boolean,
    account?: AccountModel,
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

    if (typeof body !== 'object') {

        return {
            statusCode: code,
            body: JSON.stringify(body),
        }
    }

    if (!account) {

        return {
            statusCode: code,
            body: JSON.stringify(body),
        };
    }

    return {
        statusCode: code,
        body: JSON.stringify({
            ...body,
            identifier: account.identifier,
        }),
    };
};
