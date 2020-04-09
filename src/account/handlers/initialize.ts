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
} & DeviceInformation;

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
        const profile: SwitchProfileModel = createUnsavedSwitchProfile(profileIdentifier);

        await profile.save();
        const account: AccountModel = await initializeAccount(rawBody);

        return createLambdaResponse(200, {
            identifier: account.identifier,
        }, account);
    } catch (error) {

        return createLambdaResponse(400, error.message);
    } finally {

        await closeDatabase();
    }
};
