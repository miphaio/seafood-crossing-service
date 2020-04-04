/**
 * @author WMXPY
 * @namespace Database
 * @description Account
 */

import { DeviceInformation, verifyDeviceInformationFunction } from "../entity/account"
import { AccountModel } from "../model/account";
import { createOrGetAccount } from "../service/account";
import { panic, ERROR_CODE } from "../util/panic";

export type AccountEnsureRequest = {

    readonly identifier: string;
    readonly device: DeviceInformation;
};

export const ensureAccount = async (request: AccountEnsureRequest): Promise<AccountModel> => {

    if (typeof request.identifier !== 'string') {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED)
    }

    if (!verifyDeviceInformationFunction(request.device)) {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED);
    }

    const account: AccountModel = await createOrGetAccount(request.identifier, request.device);
    return account;
};
