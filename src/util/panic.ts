/**
 * @author WMXPY
 * @namespace Util
 * @description Panic
 */

import { Panic } from 'connor';

export const MODULE_NAME = 'Seafood-Crossing';

export enum ERROR_CODE {

    DESTINATION_NOT_FOUND = 4041,

    AUTHORIZATION_PATTERN_NOT_MATCHED = 4031,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.DESTINATION_NOT_FOUND]: 'Destination: "{}" not found',

    [ERROR_CODE.AUTHORIZATION_PATTERN_NOT_MATCHED]: 'Authorization pattern not matched',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
