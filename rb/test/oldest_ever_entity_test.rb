# OldestEver entity test

require "minitest/autorun"
require "json"
require_relative "../OldestPeopleRecords_sdk"
require_relative "runner"

class OldestEverEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OldestPeopleRecordsSDK.test(nil, nil)
    ent = testsdk.OldestEver(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = oldest_ever_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "oldest_ever." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    oldest_ever_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.oldest_ever")))
    oldest_ever_ref01_data = nil
    if oldest_ever_ref01_data_raw.length > 0
      oldest_ever_ref01_data = Helpers.to_map(oldest_ever_ref01_data_raw[0][1])
    end

    # UPDATE
    oldest_ever_ref01_ent = client.OldestEver(nil)
    oldest_ever_ref01_data_up0_up = {
      "id" => oldest_ever_ref01_data["id"],
    }

    oldest_ever_ref01_markdef_up0_name = "birth_date"
    oldest_ever_ref01_markdef_up0_value = "Mark01-oldest_ever_ref01_#{setup[:now]}"
    oldest_ever_ref01_data_up0_up[oldest_ever_ref01_markdef_up0_name] = oldest_ever_ref01_markdef_up0_value

    oldest_ever_ref01_resdata_up0_result = oldest_ever_ref01_ent.update(oldest_ever_ref01_data_up0_up, nil)
    oldest_ever_ref01_resdata_up0 = Helpers.to_map(oldest_ever_ref01_resdata_up0_result)
    assert !oldest_ever_ref01_resdata_up0.nil?
    assert_equal oldest_ever_ref01_resdata_up0["id"], oldest_ever_ref01_data_up0_up["id"]
    assert_equal oldest_ever_ref01_resdata_up0[oldest_ever_ref01_markdef_up0_name], oldest_ever_ref01_markdef_up0_value

    # LOAD
    oldest_ever_ref01_match_dt0 = {
      "id" => oldest_ever_ref01_data["id"],
    }
    oldest_ever_ref01_data_dt0_loaded = oldest_ever_ref01_ent.load(oldest_ever_ref01_match_dt0, nil)
    oldest_ever_ref01_data_dt0_load_result = Helpers.to_map(oldest_ever_ref01_data_dt0_loaded)
    assert !oldest_ever_ref01_data_dt0_load_result.nil?
    assert_equal oldest_ever_ref01_data_dt0_load_result["id"], oldest_ever_ref01_data["id"]

  end
end

def oldest_ever_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "oldest_ever", "OldestEverTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OldestPeopleRecordsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["oldest_ever01", "oldest_ever02", "oldest_ever03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID" => idmap,
    "OLDESTPEOPLERECORDS_TEST_LIVE" => "FALSE",
    "OLDESTPEOPLERECORDS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = OldestPeopleRecordsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OLDESTPEOPLERECORDS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
