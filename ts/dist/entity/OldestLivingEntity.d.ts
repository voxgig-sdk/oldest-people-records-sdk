import { OldestPeopleRecordsEntityBase } from '../OldestPeopleRecordsEntityBase';
import type { OldestPeopleRecordsSDK } from '../OldestPeopleRecordsSDK';
import type { Control } from '../types';
import type { OldestLiving, OldestLivingLoadMatch, OldestLivingUpdateData } from '../OldestPeopleRecordsTypes';
declare class OldestLivingEntity extends OldestPeopleRecordsEntityBase<OldestLiving> {
    constructor(client: OldestPeopleRecordsSDK, entopts: any);
    make(this: OldestLivingEntity): OldestLivingEntity;
    load(this: any, reqmatch?: OldestLivingLoadMatch, ctrl?: Control): Promise<OldestLivingEntity>;
    update(this: any, reqdata?: OldestLivingUpdateData, ctrl?: Control): Promise<OldestLivingEntity>;
}
export { OldestLivingEntity };
