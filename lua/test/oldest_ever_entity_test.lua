-- OldestEver entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("oldest-people-records_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("OldestEverEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:OldestEver(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = oldest_ever_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "oldest_ever." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local oldest_ever_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.oldest_ever")))
    local oldest_ever_ref01_data = nil
    if #oldest_ever_ref01_data_raw > 0 then
      oldest_ever_ref01_data = helpers.to_map(oldest_ever_ref01_data_raw[1][2])
    end

    -- UPDATE
    local oldest_ever_ref01_ent = client:OldestEver(nil)
    local oldest_ever_ref01_data_up0_up = {
      id = oldest_ever_ref01_data["id"],
    }

    local oldest_ever_ref01_markdef_up0_name = "birth_date"
    local oldest_ever_ref01_markdef_up0_value = "Mark01-oldest_ever_ref01_" .. tostring(setup.now)
    oldest_ever_ref01_data_up0_up[oldest_ever_ref01_markdef_up0_name] = oldest_ever_ref01_markdef_up0_value

    local oldest_ever_ref01_resdata_up0_result, err = oldest_ever_ref01_ent:update(oldest_ever_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local oldest_ever_ref01_resdata_up0 = helpers.to_map(oldest_ever_ref01_resdata_up0_result)
    assert.is_not_nil(oldest_ever_ref01_resdata_up0)
    assert.are.equal(oldest_ever_ref01_resdata_up0["id"], oldest_ever_ref01_data_up0_up["id"])
    assert.are.equal(oldest_ever_ref01_resdata_up0[oldest_ever_ref01_markdef_up0_name], oldest_ever_ref01_markdef_up0_value)

    -- LOAD
    local oldest_ever_ref01_match_dt0 = {
      id = oldest_ever_ref01_data["id"],
    }
    local oldest_ever_ref01_data_dt0_loaded, err = oldest_ever_ref01_ent:load(oldest_ever_ref01_match_dt0, nil)
    assert.is_nil(err)
    local oldest_ever_ref01_data_dt0_load_result = helpers.to_map(oldest_ever_ref01_data_dt0_loaded)
    assert.is_not_nil(oldest_ever_ref01_data_dt0_load_result)
    assert.are.equal(oldest_ever_ref01_data_dt0_load_result["id"], oldest_ever_ref01_data["id"])

  end)
end)

function oldest_ever_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/oldest_ever/OldestEverTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read oldest_ever test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "oldest_ever01", "oldest_ever02", "oldest_ever03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"] = idmap,
    ["OLDESTPEOPLERECORDS_TEST_LIVE"] = "FALSE",
    ["OLDESTPEOPLERECORDS_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["OLDESTPEOPLERECORDS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
