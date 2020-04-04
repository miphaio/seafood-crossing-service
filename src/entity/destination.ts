/**
 * @author WMXPY
 * @namespace Entity
 * @description Destination
 */

import { ObjectID } from "bson";

export type DestinationOccupancy = {

    readonly at: Date;
    readonly _account: ObjectID;
};

export type DestinationReport = {

    readonly at: Date;
    readonly reason: string;
    readonly _account: ObjectID;
};

export type DestinationConfig = {

    readonly accessCode: string;
    readonly _account: ObjectID;

    capacity: number;
    duration: number;
};

export type DestinationEntity = {

    active: boolean;

    occupancies: DestinationOccupancy[];
    reports: DestinationReport[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & DestinationConfig;
