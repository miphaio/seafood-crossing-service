/**
 * @author WMXPY
 * @namespace Service
 * @description Switch Profile
 */

import { ObjectID } from "bson";
import { SwitchProfileConfig } from "../entity/switch-profile";
import { SwitchProfileModel } from "../model/switch-profile";

export const createUnsavedSwitchProfile = (profileIdentifier: string, accountId: ObjectID): SwitchProfileModel => {

    const config: SwitchProfileConfig = {
        profileIdentifier,
        _account: accountId,
    };

    return new SwitchProfileModel(config);
};
