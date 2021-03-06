/**
 * @author WMXPY
 * @namespace Entity
 * @description Destination
 */

import { ObjectID } from "bson";
import { DESTINATION_CATEGORY } from "../declare/destination";

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

    category: DESTINATION_CATEGORY;
    title: string;
    description: string;

    capacity: number;
    duration: number;
    expireAt: Date;
};

export type DestinationEntity = {

    active: boolean;

    occupancies: DestinationOccupancy[];
    occupanciesLength: number,
    reports: DestinationReport[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
} & DestinationConfig;
