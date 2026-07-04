# OldestPeopleRecords Ruby SDK Reference

Complete API reference for the OldestPeopleRecords Ruby SDK.


## OldestPeopleRecordsSDK

### Constructor

```ruby
require_relative 'oldest-people-records_sdk'

client = OldestPeopleRecordsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OldestPeopleRecordsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OldestPeopleRecordsSDK.test
```


### Instance Methods

#### `OldestEver(data = nil)`

Create a new `OldestEver` entity instance. Pass `nil` for no initial data.

#### `OldestLiving(data = nil)`

Create a new `OldestLiving` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## OldestEverEntity

```ruby
oldest_ever = client.oldest_ever
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.oldest_ever.load({ "id" => "oldest_ever_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.oldest_ever.update({
  "id" => "oldest_ever_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OldestEverEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OldestLivingEntity

```ruby
oldest_living = client.oldest_living
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.oldest_living.load({ "id" => "oldest_living_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.oldest_living.update({
  "id" => "oldest_living_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OldestLivingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OldestPeopleRecordsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

