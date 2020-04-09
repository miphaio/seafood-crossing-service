/**
 * @author WMXPY
 * @namespace Service
 * @description Account
 */

import { AccountModel } from "../model/account";
import { AccountConfig, DeviceInformation } from "../entity/account";
import { randomApiKey } from "@sudoo/random";

export const createUnsavedAccount = (device: DeviceInformation): AccountModel => {

    const identifier: string = randomApiKey(2);
    const config: AccountConfig = {
        identifier,
        devices: [device],
    };

    return new AccountModel(config);
};

export const getAccountByIdentifier = async (identifier: string): Promise<AccountModel | null> => {

    const account: AccountModel | null = await AccountModel.findOne({
        identifier,
    });

    return account;
};

export const createOrGetAccount = async (identifier: string, device: DeviceInformation): Promise<AccountModel> => {

    const existAccount: AccountModel | null = await getAccountByIdentifier(identifier);

    if (existAccount) {
        if (!existAccount.hasDevice(device)) {
            existAccount.addDevice(device);
            await existAccount.save();
        }
        return existAccount;
    }

    const newAccount: AccountModel = createUnsavedAccount(device);
    await newAccount.save();

    return newAccount;
};

export const getAccountAuthorization = async (identifier: string, device: DeviceInformation): Promise<AccountModel | null> => {

    const account: AccountModel | null = await getAccountByIdentifier(identifier);

    if (!account) {
        return null;
    }

    if (!account.hasDevice(device)) {
        return null;
    }

    return account;
};
