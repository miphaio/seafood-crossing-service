/**
 * @author WMXPY
 * @namespace Database
 * @description Connect
 */

import * as Mongoose from "mongoose";

export const connectDatabase = (): (() => void) => {

    const dbLink: string | undefined = process.env.SEAFOOD_CROSSING_DATABASE;

    if (!dbLink) {
        throw new Error('dbLink');
    }

    Mongoose.connect(
        dbLink,
        {
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
    );

    return () => {
        Mongoose.disconnect();
    };
};

