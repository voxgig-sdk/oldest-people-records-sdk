# OldestPeopleRecords SDK

Look up the oldest living person and the oldest person ever recorded

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Oldest People Records API

The Oldest People Records API exposes data about two well-known longevity records: the oldest person currently alive and the oldest person who ever lived. It is a small, single-purpose service hosted at [whoistheoldest.com](https://whoistheoldest.com) and catalogued on [Free Public APIs](https://freepublicapis.com/oldest-people-records-api).

What you get from the API:

- `GET /api/oldest-person-ever` — record for the oldest person ever documented.
- `GET /api/oldest-living-person` — record for the current oldest living person.

Operational notes: the catalogue page reports that CORS is disabled and no authentication is documented. At the time the upstream listing was last checked, both endpoints were returning errors, so callers should be prepared for the service to be unavailable.

## Try it

**TypeScript**
```bash
npm install oldest-people-records
```

**Python**
```bash
pip install oldest-people-records-sdk
```

**PHP**
```bash
composer require voxgig/oldest-people-records-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/oldest-people-records-sdk/go
```

**Ruby**
```bash
gem install oldest-people-records-sdk
```

**Lua**
```bash
luarocks install oldest-people-records-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OldestPeopleRecordsSDK } from 'oldest-people-records'

const client = new OldestPeopleRecordsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o oldest-people-records-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "oldest-people-records": {
      "command": "/abs/path/to/oldest-people-records-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **OldestEver** | The oldest person ever recorded, served from `GET /api/oldest-person-ever`. | `/oldest-ever` |
| **OldestLiving** | The oldest person currently alive, served from `GET /api/oldest-living-person`. | `/oldest-living` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from oldestpeoplerecords_sdk import OldestPeopleRecordsSDK

client = OldestPeopleRecordsSDK({})


# Load a specific oldestever
oldestever, err = client.OldestEver(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'oldestpeoplerecords_sdk.php';

$client = new OldestPeopleRecordsSDK([]);


// Load a specific oldestever
[$oldestever, $err] = $client->OldestEver(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/oldest-people-records-sdk/go"

client := sdk.NewOldestPeopleRecordsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "OldestPeopleRecords_sdk"

client = OldestPeopleRecordsSDK.new({})


# Load a specific oldestever
oldestever, err = client.OldestEver(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("oldest-people-records_sdk")

local client = sdk.new({})


-- Load a specific oldestever
local oldestever, err = client:OldestEver(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OldestPeopleRecordsSDK.test()
const result = await client.OldestEver().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OldestPeopleRecordsSDK.test(None, None)
result, err = client.OldestEver(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OldestPeopleRecordsSDK::test(null, null);
[$result, $err] = $client->OldestEver(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.OldestEver(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OldestPeopleRecordsSDK.test(nil, nil)
result, err = client.OldestEver(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:OldestEver(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Oldest People Records API

- Upstream: [https://whoistheoldest.com](https://whoistheoldest.com)

---

Generated from the Oldest People Records API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
