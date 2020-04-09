/**
 * @author WMXPY
 * @namespace Service
 * @description Switch Profile
 */

import { SwitchProfileConfig } from "../entity/switch-profile";
import { SwitchProfileModel } from "../model/switch-profile";

export const createUnsavedSwitchProfile = (profileIdentifier: string): SwitchProfileModel => {

    const config: SwitchProfileConfig = {
        profileIdentifier,
    };

    return new SwitchProfileModel(config);
};
