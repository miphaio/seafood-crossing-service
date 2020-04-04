/**
 * @author WMXPY
 * @namespace Entity
 * @description Account
 */

export const verifyDeviceInformationFunction = (device: DeviceInformation): boolean => {

    if (!device) {
        return false;
    }

    return (typeof device.matcher === 'string'
        && typeof device.model === 'string'
        && typeof device.name === 'string');
};

export type DeviceInformation = {

    readonly name: string;
    readonly model: string;
    readonly matcher: string;
};

export type AccountConfig = {

    readonly identifier: string;

    devices: DeviceInformation[];
};

export type AccountEntity = {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & AccountConfig;
