# OldestPeopleRecords PHP SDK Reference

Complete API reference for the OldestPeopleRecords PHP SDK.


## OldestPeopleRecordsSDK

### Constructor

```php
require_once __DIR__ . '/oldest-people-records_sdk.php';

$client = new OldestPeopleRecordsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OldestPeopleRecordsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OldestPeopleRecordsSDK::test();
```


### Instance Methods

#### `OldestEver($data = null)`

Create a new `OldestEverEntity` instance. Pass `null` for no initial data.

#### `OldestLiving($data = null)`

Create a new `OldestLivingEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## OldestEverEntity

```php
$oldest_ever = $client->OldestEver();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->OldestEver()->load(["id" => "oldest_ever_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->OldestEver()->update([
  "id" => "oldest_ever_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OldestEverEntity`

Create a new `OldestEverEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OldestLivingEntity

```php
$oldest_living = $client->OldestLiving();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->OldestLiving()->load(["id" => "oldest_living_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->OldestLiving()->update([
  "id" => "oldest_living_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OldestLivingEntity`

Create a new `OldestLivingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OldestPeopleRecordsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

