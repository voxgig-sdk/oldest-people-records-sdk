<?php
declare(strict_types=1);

// OldestEver entity test

require_once __DIR__ . '/../oldestpeoplerecords_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OldestEverEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OldestPeopleRecordsSDK::test(null, null);
        $ent = $testsdk->OldestEver(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = oldest_ever_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "oldest_ever." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $oldest_ever_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.oldest_ever")));
        $oldest_ever_ref01_data = null;
        if (count($oldest_ever_ref01_data_raw) > 0) {
            $oldest_ever_ref01_data = Helpers::to_map($oldest_ever_ref01_data_raw[0][1]);
        }

        // UPDATE
        $oldest_ever_ref01_ent = $client->OldestEver(null);
        $oldest_ever_ref01_data_up0_up = [
            "id" => $oldest_ever_ref01_data["id"],
        ];

        $oldest_ever_ref01_markdef_up0_name = "birth_date";
        $oldest_ever_ref01_markdef_up0_value = "Mark01-oldest_ever_ref01_" . $setup["now"];
        $oldest_ever_ref01_data_up0_up[$oldest_ever_ref01_markdef_up0_name] = $oldest_ever_ref01_markdef_up0_value;

        [$oldest_ever_ref01_resdata_up0_result, $err] = $oldest_ever_ref01_ent->update($oldest_ever_ref01_data_up0_up, null);
        $this->assertNull($err);
        $oldest_ever_ref01_resdata_up0 = Helpers::to_map($oldest_ever_ref01_resdata_up0_result);
        $this->assertNotNull($oldest_ever_ref01_resdata_up0);
        $this->assertEquals($oldest_ever_ref01_resdata_up0["id"], $oldest_ever_ref01_data_up0_up["id"]);
        $this->assertEquals($oldest_ever_ref01_resdata_up0[$oldest_ever_ref01_markdef_up0_name], $oldest_ever_ref01_markdef_up0_value);

        // LOAD
        $oldest_ever_ref01_match_dt0 = [
            "id" => $oldest_ever_ref01_data["id"],
        ];
        [$oldest_ever_ref01_data_dt0_loaded, $err] = $oldest_ever_ref01_ent->load($oldest_ever_ref01_match_dt0, null);
        $this->assertNull($err);
        $oldest_ever_ref01_data_dt0_load_result = Helpers::to_map($oldest_ever_ref01_data_dt0_loaded);
        $this->assertNotNull($oldest_ever_ref01_data_dt0_load_result);
        $this->assertEquals($oldest_ever_ref01_data_dt0_load_result["id"], $oldest_ever_ref01_data["id"]);

    }
}

function oldest_ever_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/oldest_ever/OldestEverTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OldestPeopleRecordsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["oldest_ever01", "oldest_ever02", "oldest_ever03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID" => $idmap,
        "OLDESTPEOPLERECORDS_TEST_LIVE" => "FALSE",
        "OLDESTPEOPLERECORDS_TEST_EXPLAIN" => "FALSE",
        "OLDESTPEOPLERECORDS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OLDESTPEOPLERECORDS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OLDESTPEOPLERECORDS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new OldestPeopleRecordsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OLDESTPEOPLERECORDS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OLDESTPEOPLERECORDS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
