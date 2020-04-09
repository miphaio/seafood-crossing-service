/**
 * @author WMXPY
 * @namespace Account_Handler
 * @description Initialize
 */

import { Safe, SafeExtract } from '@sudoo/extract';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { initializeAccount } from "../../common/account";
import { CloseDatabaseFunction, connectDatabase } from "../../database/connect";
import { DeviceInformation } from '../../entity/account';
import { AccountModel } from "../../model/account";
import { SwitchProfileModel } from '../../model/switch-profile';
import { createUnsavedSwitchProfile } from '../../service/switch-profile';
import { createLambdaResponse } from "../../util/lambda";

export type InitializeAccountHandlerRequest = {
    readonly profileIdentifier: string;
    readonly device: DeviceInformation;
    readonly version: string;
};

export const initializeAccountHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    if (event.body === null) {

        return createLambdaResponse(400, 'No Body');
    }
    const rawBody: InitializeAccountHandlerRequest = JSON.parse(event.body);
    const body: SafeExtract<InitializeAccountHandlerRequest> = Safe.extract(rawBody, new Error('Pattern Not Matched'));

    const closeDatabase: CloseDatabaseFunction = await connectDatabase();

    try {

        const profileIdentifier: string = body.directVerify('profileIdentifier', (identifier: string) => {
            return typeof identifier === 'string';
        });
        const device: DeviceInformation = body.directVerify('device', (info: DeviceInformation) => {
            return typeof info === 'object';
        });

        const account: AccountModel = await initializeAccount(device);
        const profile: SwitchProfileModel = createUnsavedSwitchProfile(profileIdentifier, account._id);

        await profile.save();

        return createLambdaResponse(200, {}, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
