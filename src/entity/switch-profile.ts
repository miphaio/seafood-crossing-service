/**
 * @author WMXPY
 * @namespace Entity
 * @description Switch Profile
 */

import { ObjectID } from "bson";

export type SwitchProfileConfig = {

    readonly profileIdentifier: string;

    readonly _account: ObjectID;
};

export type SwitchProfileEntity = {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & SwitchProfileConfig;
