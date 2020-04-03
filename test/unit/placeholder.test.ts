/**
 * @author WMXPY
 * @namespace Service
 * @description Placeholder
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Placeholder', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('Placeholder', (): void => {

        const value: string = chance.string();

        expect(value).to.be.equal(value);
    });
});
