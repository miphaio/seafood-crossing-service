/**
 * @author WMXPY
 * @namespace Service
 * @description Account
 */

import { AccountModel } from "../model/account";
import { AccountConfig } from "../entity/account";
import { randomApiKey } from "@sudoo/random";

export const createUnsavedAccount = (): AccountModel => {

    const identifier: string = randomApiKey(2);
    const config: AccountConfig = {
        identifier,
    };
    return new AccountModel(config);
};
