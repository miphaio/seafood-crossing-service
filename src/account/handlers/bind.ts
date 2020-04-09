/**
 * @author WMXPY
 * @namespace Account_Handler
 * @description Bind
 */

import { Safe, SafeExtract } from '@sudoo/extract';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { DeviceInformation } from '../../entity/account';
import { AccountModel } from "../../model/account";
import { getAccountByIdentifier } from '../../service/account';
import { createLambdaResponse } from "../../util/lambda";

export type BindAccountHandlerRequest = {
    readonly identifier: string;
    readonly device: DeviceInformation;
    readonly version: string;
};

export const bindAccountHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: BindAccountHandlerRequest = JSON.parse(event.body);
    const body: SafeExtract<BindAccountHandlerRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const identifier: string = body.directVerify('identifier', (target: string) => {
            return typeof target === 'string';
        });
        const device: DeviceInformation = body.directVerify('device', (info: DeviceInformation) => {
            return typeof info === 'object';
        });

        const account: AccountModel | null = await getAccountByIdentifier(identifier);

        if (!account) {
            return createLambdaResponse(403, 'Authorization');
        }

        account.addDevice(device);
        await account.save();

        return createLambdaResponse(200, {}, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
