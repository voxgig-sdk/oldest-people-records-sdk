"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OldestLivingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OLDEST_PEOPLE_RECORDS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OLDEST_PEOPLE_RECORDS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OldestPeopleRecordsSDK.test();
        const ent = testsdk.OldestLiving();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OLDEST_PEOPLE_RECORDS_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'oldest_living.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "age", "req": true, "short": "Age in years", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "format": "date", "name": "birthDate", "req": true, "short": "Date of birth in ISO 8601 format", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "country", "req": true, "short": "Country of origin", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "date", "name": "deathDate", "req": false, "short": "Date of death in ISO 8601 format (null if still living)", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": true, "short": "Unique identifier for the person", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "lastUpdated", "req": false, "short": "Timestamp of last update", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "name", "req": true, "short": "Full name of the person", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "verified", "req": false, "short": "Whether the record has been verified", "type": "`$BOOLEAN`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "oldest_living", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "birth_date_after", "orig": "birth_date_after", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "birth_date_before", "orig": "birth_date_before", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /oldest-living", "json": "{\"operationId\":\"getOldestLiving\",\"parameters\":[{\"description\":\"Filter by country of origin\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter for people born after this date (ISO 8601 format)\",\"in\":\"query\",\"name\":\"birthDateAfter\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter for people born before this date (ISO 8601 format)\",\"in\":\"query\",\"name\":\"birthDateBefore\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"age\":{\"description\":\"Age in years\",\"type\":\"integer\"},\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Timestamp of last update\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"id\",\"name\",\"birthDate\",\"age\",\"country\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"No record found matching the criteria\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/oldest-living", "segments": [{ "lit": "oldest-living" }], "select": { "exist": ["birth_date_after", "birth_date_before", "country"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": {}, "contract": { "id": "PUT /oldest-living", "json": "{\"operationId\":\"updateOldestLiving\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"name\",\"birthDate\",\"country\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"age\":{\"description\":\"Age in years\",\"type\":\"integer\"},\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Timestamp of last update\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"id\",\"name\",\"birthDate\",\"age\",\"country\"],\"type\":\"object\"}}},\"description\":\"Successfully updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Invalid input data\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/oldest-living", "segments": [{ "lit": "oldest-living" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "oldest_living", "name__orig": "oldest_living", "Name": "OldestLiving", "name_": "oldest_living", "name-": "oldest-living", "NAME": "OLDEST_LIVING", "index$": 1 }, { "active": true, "entity": "oldest_living", "key$": "BasicOldestLivingFlow", "kind": "basic", "name": "BasicOldestLivingFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "oldest_living_ref01", "srcdatavar": "oldest_living_ref01_data", "suffix": "_up0", "textfield": "birthDate" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-oldest_living_ref01" } }], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "oldest_living_ref01", "srcdatavar": "oldest_living_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-oldest_living_ref01" } }], "index$": 1 }] }, 'OldestLiving');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let oldest_living_ref01_data = Object.values(setup.data.existing.oldest_living)[0];
        // UPDATE
        const oldest_living_ref01_ent = client.OldestLiving();
        const oldest_living_ref01_data_up0 = {};
        oldest_living_ref01_data_up0.id = oldest_living_ref01_data.id;
        const oldest_living_ref01_markdef_up0 = { name: 'birthDate', value: 'Mark01-oldest_living_ref01_' + setup.now };
        oldest_living_ref01_data_up0[oldest_living_ref01_markdef_up0.name] = oldest_living_ref01_markdef_up0.value;
        const oldest_living_ref01_resdata_up0 = (await oldest_living_ref01_ent.update(oldest_living_ref01_data_up0)).data();
        (0, node_assert_1.default)(oldest_living_ref01_resdata_up0.id === oldest_living_ref01_data_up0.id);
        (0, node_assert_1.default)(oldest_living_ref01_resdata_up0[oldest_living_ref01_markdef_up0.name] === oldest_living_ref01_markdef_up0.value);
        // LOAD
        const oldest_living_ref01_match_dt0 = {};
        oldest_living_ref01_match_dt0.id = oldest_living_ref01_data.id;
        const oldest_living_ref01_data_dt0 = (await oldest_living_ref01_ent.load(oldest_living_ref01_match_dt0)).data();
        (0, node_assert_1.default)(oldest_living_ref01_data_dt0.id === oldest_living_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/oldest_living/OldestLivingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OldestPeopleRecordsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['oldest_living01', 'oldest_living02', 'oldest_living03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID': idmap,
        'OLDEST_PEOPLE_RECORDS_TEST_LIVE': 'FALSE',
        'OLDEST_PEOPLE_RECORDS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID'];
    const live = 'TRUE' === env.OLDEST_PEOPLE_RECORDS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OldestPeopleRecordsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OLDEST_PEOPLE_RECORDS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OldestLivingEntity.test.js.map