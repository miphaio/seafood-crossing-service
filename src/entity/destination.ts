/**
 * @author WMXPY
 * @namespace Entity
 * @description Destination
 */

export type DestinationConfig = {
};

export type DestinationEntity = {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & DestinationConfig;
