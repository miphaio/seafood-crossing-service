/**
 * @author WMXPY
 * @namespace Entity
 * @description Account
 */

export type DeviceInformation = {

    readonly model: string;
    readonly matcher: string;
};

export type AccountConfig = {

    readonly identifier: string;

    devices?: DeviceInformation[];
};

export type AccountEntity = {

    active: boolean;

    devices: DeviceInformation[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & AccountConfig;
