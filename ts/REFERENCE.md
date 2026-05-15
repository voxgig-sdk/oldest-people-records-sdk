# OldestPeopleRecords TypeScript SDK Reference

Complete API reference for the OldestPeopleRecords TypeScript SDK.


## OldestPeopleRecordsSDK

### Constructor

```ts
new OldestPeopleRecordsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OldestPeopleRecordsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OldestPeopleRecordsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OldestPeopleRecordsSDK` instance in test mode.


### Instance Methods

#### `OldestEver(data?: object)`

Create a new `OldestEver` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OldestEverEntity` instance.

#### `OldestLiving(data?: object)`

Create a new `OldestLiving` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OldestLivingEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OldestPeopleRecordsSDK.test()`.

**Returns:** `OldestPeopleRecordsSDK` instance in test mode.


---

## OldestEverEntity

```ts
const oldest_ever = client.OldestEver()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | ``$INTEGER`` | Yes |  |
| `birth_date` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `death_date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `last_updated` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `verified` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OldestEver().load({ id: 'oldest_ever_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OldestEver().update({
  id: 'oldest_ever_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OldestEverEntity` instance with the same client and
options.

#### `client()`

Return the parent `OldestPeopleRecordsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OldestLivingEntity

```ts
const oldest_living = client.OldestLiving()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | ``$INTEGER`` | Yes |  |
| `birth_date` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `death_date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `last_updated` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `verified` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OldestLiving().load({ id: 'oldest_living_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OldestLiving().update({
  id: 'oldest_living_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OldestLivingEntity` instance with the same client and
options.

#### `client()`

Return the parent `OldestPeopleRecordsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OldestPeopleRecordsSDK({
  feature: {
    test: { active: true },
  }
})
```

