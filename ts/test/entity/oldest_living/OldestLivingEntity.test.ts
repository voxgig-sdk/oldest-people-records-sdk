

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OldestPeopleRecordsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('OldestLivingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OLDEST_PEOPLE_RECORDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('OLDEST_PEOPLE_RECORDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OldestPeopleRecordsSDK.test()
    const ent = testsdk.OldestLiving()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OLDEST_PEOPLE_RECORDS_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oldest_living.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"age","req":true,"short":"Age in years","type":"`$INTEGER`","index$":0},{"active":true,"format":"date","name":"birthDate","req":true,"short":"Date of birth in ISO 8601 format","type":"`$STRING`","index$":1},{"active":true,"name":"country","req":true,"short":"Country of origin","type":"`$STRING`","index$":2},{"active":true,"format":"date","name":"deathDate","req":false,"short":"Date of death in ISO 8601 format (null if still living)","type":"`$STRING`","index$":3},{"active":true,"name":"id","req":true,"short":"Unique identifier for the person","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"short":"Timestamp of last update","type":"`$STRING`","index$":5},{"active":true,"name":"name","req":true,"short":"Full name of the person","type":"`$STRING`","index$":6},{"active":true,"name":"verified","req":false,"short":"Whether the record has been verified","type":"`$BOOLEAN`","index$":7}],"id":{"field":"id","name":"id"},"name":"oldest_living","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"birth_date_after","orig":"birth_date_after","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"birth_date_before","orig":"birth_date_before","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /oldest-living","json":"{\"operationId\":\"getOldestLiving\",\"parameters\":[{\"description\":\"Filter by country of origin\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter for people born after this date (ISO 8601 format)\",\"in\":\"query\",\"name\":\"birthDateAfter\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter for people born before this date (ISO 8601 format)\",\"in\":\"query\",\"name\":\"birthDateBefore\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"age\":{\"description\":\"Age in years\",\"type\":\"integer\"},\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Timestamp of last update\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"id\",\"name\",\"birthDate\",\"age\",\"country\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"No record found matching the criteria\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/oldest-living","segments":[{"lit":"oldest-living"}],"select":{"exist":["birth_date_after","birth_date_before","country"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{},"contract":{"id":"PUT /oldest-living","json":"{\"operationId\":\"updateOldestLiving\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"name\",\"birthDate\",\"country\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"age\":{\"description\":\"Age in years\",\"type\":\"integer\"},\"birthDate\":{\"description\":\"Date of birth in ISO 8601 format\",\"format\":\"date\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"type\":\"string\"},\"deathDate\":{\"description\":\"Date of death in ISO 8601 format (null if still living)\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the person\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Timestamp of last update\",\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"},\"verified\":{\"description\":\"Whether the record has been verified\",\"type\":\"boolean\"}},\"required\":[\"id\",\"name\",\"birthDate\",\"age\",\"country\"],\"type\":\"object\"}}},\"description\":\"Successfully updated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Invalid input data\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/oldest-living","segments":[{"lit":"oldest-living"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"oldest_living","name__orig":"oldest_living","Name":"OldestLiving","name_":"oldest_living","name-":"oldest-living","NAME":"OLDEST_LIVING","index$":1}, {"active":true,"entity":"oldest_living","key$":"BasicOldestLivingFlow","kind":"basic","name":"BasicOldestLivingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"oldest_living_ref01","srcdatavar":"oldest_living_ref01_data","suffix":"_up0","textfield":"birthDate"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oldest_living_ref01"}}],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"oldest_living_ref01","srcdatavar":"oldest_living_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oldest_living_ref01"}}],"index$":1}]}, 'OldestLiving')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let oldest_living_ref01_data = Object.values(setup.data.existing.oldest_living)[0] as any

    // UPDATE
    const oldest_living_ref01_ent = client.OldestLiving()
    const oldest_living_ref01_data_up0: any = {}
    oldest_living_ref01_data_up0.id = oldest_living_ref01_data.id

    const oldest_living_ref01_markdef_up0 = { name: 'birthDate', value: 'Mark01-oldest_living_ref01_' + setup.now }
    ;(oldest_living_ref01_data_up0 as any)[oldest_living_ref01_markdef_up0.name] = oldest_living_ref01_markdef_up0.value

    const oldest_living_ref01_resdata_up0 = (await oldest_living_ref01_ent.update(oldest_living_ref01_data_up0)).data()
    assert(oldest_living_ref01_resdata_up0.id === oldest_living_ref01_data_up0.id)

    assert((oldest_living_ref01_resdata_up0 as any)[oldest_living_ref01_markdef_up0.name] === oldest_living_ref01_markdef_up0.value)


    // LOAD
    const oldest_living_ref01_match_dt0: any = {}
    oldest_living_ref01_match_dt0.id = oldest_living_ref01_data.id
    const oldest_living_ref01_data_dt0 = (await oldest_living_ref01_ent.load(oldest_living_ref01_match_dt0)).data()
    assert(oldest_living_ref01_data_dt0.id === oldest_living_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/oldest_living/OldestLivingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OldestPeopleRecordsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['oldest_living01','oldest_living02','oldest_living03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID': idmap,
    'OLDEST_PEOPLE_RECORDS_TEST_LIVE': 'FALSE',
    'OLDEST_PEOPLE_RECORDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID']

  const live = 'TRUE' === env.OLDEST_PEOPLE_RECORDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OLDEST_PEOPLE_RECORDS_TEST_OLDEST_LIVING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OldestPeopleRecordsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
