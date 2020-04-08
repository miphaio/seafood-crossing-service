/**
 * @author WMXPY
 * @namespace Declare
 * @description Destination
 */

export enum DESTINATION_CATEGORY {

    TURNIP_BUY = "TURNIP_BUY",
    TURNIP_SELL = "TURNIP_SELL",
    TOUR = "TOUR",
    MABEL = "MABEL",
    SAHARAH = "SAHARAH",
    OTHER = "OTHER",
}

export const DESTINATION_CATEGORY_LIST = [

    DESTINATION_CATEGORY.TURNIP_BUY,
    DESTINATION_CATEGORY.TURNIP_SELL,
    DESTINATION_CATEGORY.TOUR,
    DESTINATION_CATEGORY.MABEL,
    DESTINATION_CATEGORY.SAHARAH,
    DESTINATION_CATEGORY.OTHER,
];

export const verifyDestinationCategory = (element: DESTINATION_CATEGORY): boolean => {

    return DESTINATION_CATEGORY_LIST.includes(element);
};
