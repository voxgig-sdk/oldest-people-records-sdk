import { OldestEverEntity } from './entity/OldestEverEntity';
import { OldestLivingEntity } from './entity/OldestLivingEntity';
export type * from './OldestPeopleRecordsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OldestPeopleRecordsEntityBase } from './OldestPeopleRecordsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OldestPeopleRecordsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    OldestEver(entopts?: Record<string, any>): OldestEverEntity;
    OldestLiving(entopts?: Record<string, any>): OldestLivingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OldestPeopleRecordsSDK;
    tester(testopts?: any, sdkopts?: any): OldestPeopleRecordsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OldestPeopleRecordsSDK;
export { stdutil, config, BaseFeature, OldestPeopleRecordsEntityBase, OldestPeopleRecordsSDK, SDK, };
