/**
 * @author WMXPY
 * @namespace Database
 * @description Connect
 */

import * as Mongoose from "mongoose";

export type CloseDatabaseFunction = () => Promise<void>;

export const connectDatabase = async (): Promise<CloseDatabaseFunction> => {

    const dbLink: string | undefined = process.env.SEAFOOD_CROSSING_DATABASE;

    if (!dbLink) {
        throw new Error('dbLink');
    }

    await Mongoose.connect(
        dbLink,
        {
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
    );

    // eslint-disable-next-line @typescript-eslint/require-await
    return async () => {
        Mongoose.disconnect();
    };
};
