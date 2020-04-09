/**
 * @author WMXPY
 * @namespace Database
 * @description Account
 */

import { DeviceInformation, verifyDeviceInformationFunction } from "../entity/account"
import { AccountModel } from "../model/account";
import { createOrGetAccount, getAccountAuthorization, createUnsavedAccount } from "../service/account";
import { panic, ERROR_CODE } from "../util/panic";

export type AccountEnsureRequest = {

    readonly version: string;
    readonly identifier: string;
    readonly device: DeviceInformation;
};

export const initializeAccount = async (device: DeviceInformation): Promise<AccountModel> => {

    const account: AccountModel = createUnsavedAccount(device);
    await account.save();
    return account;
};

export const verifyAccount = async (request: AccountEnsureRequest): Promise<AccountModel | null> => {

    if (typeof request.version !== 'string') {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED)
    }

    if (typeof request.identifier !== 'string') {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED)
    }

    if (!verifyDeviceInformationFunction(request.device)) {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED);
    }

    const account: AccountModel | null = await getAccountAuthorization(request.identifier, request.device);
    return account;
};

export const ensureAccount = async (request: AccountEnsureRequest): Promise<AccountModel> => {

    if (typeof request.version !== 'string') {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED)
    }

    if (typeof request.identifier !== 'string') {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED)
    }

    if (!verifyDeviceInformationFunction(request.device)) {
        throw panic.code(ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED);
    }

    const account: AccountModel = await createOrGetAccount(request.identifier, request.device);
    return account;
};
