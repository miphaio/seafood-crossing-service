/**
 * @author WMXPY
 * @namespace Entity
 * @description Switch Profile
 */

export type SwitchProfileConfig = {

    readonly profileIdentifier: string;
};

export type SwitchProfileEntity = {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & SwitchProfileConfig;
