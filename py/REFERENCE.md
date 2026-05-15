# OldestPeopleRecords Python SDK Reference

Complete API reference for the OldestPeopleRecords Python SDK.


## OldestPeopleRecordsSDK

### Constructor

```python
from oldest-people-records_sdk import OldestPeopleRecordsSDK

client = OldestPeopleRecordsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OldestPeopleRecordsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OldestPeopleRecordsSDK.test()
```


### Instance Methods

#### `OldestEver(data=None)`

Create a new `OldestEverEntity` instance. Pass `None` for no initial data.

#### `OldestLiving(data=None)`

Create a new `OldestLivingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## OldestEverEntity

```python
oldest_ever = client.OldestEver()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.OldestEver().load({"id": "oldest_ever_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.OldestEver().update({
    "id": "oldest_ever_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OldestEverEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OldestLivingEntity

```python
oldest_living = client.OldestLiving()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.OldestLiving().load({"id": "oldest_living_id"})
```

#### `update(reqdata, ctrl=None) -> tuple`

Update an existing entity. The data must include the entity `id`.

```python
result, err = client.OldestLiving().update({
    "id": "oldest_living_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OldestLivingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OldestPeopleRecordsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

