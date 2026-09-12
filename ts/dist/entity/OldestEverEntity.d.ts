import { OldestPeopleRecordsEntityBase } from '../OldestPeopleRecordsEntityBase';
import type { OldestPeopleRecordsSDK } from '../OldestPeopleRecordsSDK';
import type { Control } from '../types';
import type { OldestEver, OldestEverLoadMatch, OldestEverUpdateData } from '../OldestPeopleRecordsTypes';
declare class OldestEverEntity extends OldestPeopleRecordsEntityBase<OldestEver> {
    constructor(client: OldestPeopleRecordsSDK, entopts: any);
    make(this: OldestEverEntity): OldestEverEntity;
    load(this: any, reqmatch?: OldestEverLoadMatch, ctrl?: Control): Promise<OldestEverEntity>;
    update(this: any, reqdata?: OldestEverUpdateData, ctrl?: Control): Promise<OldestEverEntity>;
}
export { OldestEverEntity };
