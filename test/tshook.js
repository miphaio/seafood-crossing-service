/**
 * @author WMXPY
 * @namespace Hook
 * @description TS-Hook
 */

const ts_node = require("ts-node");

process.env = Object.assign(process.env, {
    NODE_ENV: 'test'
});
ts_node.register({
    project: 'tsconfig.json'
});
