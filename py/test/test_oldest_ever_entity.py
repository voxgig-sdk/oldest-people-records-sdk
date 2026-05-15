# OldestEver entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from oldestpeoplerecords_sdk import OldestPeopleRecordsSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestOldestEverEntity:

    def test_should_create_instance(self):
        testsdk = OldestPeopleRecordsSDK.test(None, None)
        ent = testsdk.OldestEver(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _oldest_ever_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "oldest_ever." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        oldest_ever_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.oldest_ever")))
        oldest_ever_ref01_data = None
        if len(oldest_ever_ref01_data_raw) > 0:
            oldest_ever_ref01_data = helpers.to_map(oldest_ever_ref01_data_raw[0][1])

        # UPDATE
        oldest_ever_ref01_ent = client.OldestEver(None)
        oldest_ever_ref01_data_up0_up = {
            "id": oldest_ever_ref01_data["id"],
        }

        oldest_ever_ref01_markdef_up0_name = "birth_date"
        oldest_ever_ref01_markdef_up0_value = "Mark01-oldest_ever_ref01_" + str(setup["now"])
        oldest_ever_ref01_data_up0_up[oldest_ever_ref01_markdef_up0_name] = oldest_ever_ref01_markdef_up0_value

        oldest_ever_ref01_resdata_up0_result, err = oldest_ever_ref01_ent.update(oldest_ever_ref01_data_up0_up, None)
        assert err is None
        oldest_ever_ref01_resdata_up0 = helpers.to_map(oldest_ever_ref01_resdata_up0_result)
        assert oldest_ever_ref01_resdata_up0 is not None
        assert oldest_ever_ref01_resdata_up0["id"] == oldest_ever_ref01_data_up0_up["id"]
        assert oldest_ever_ref01_resdata_up0[oldest_ever_ref01_markdef_up0_name] == oldest_ever_ref01_markdef_up0_value

        # LOAD
        oldest_ever_ref01_match_dt0 = {
            "id": oldest_ever_ref01_data["id"],
        }
        oldest_ever_ref01_data_dt0_loaded, err = oldest_ever_ref01_ent.load(oldest_ever_ref01_match_dt0, None)
        assert err is None
        oldest_ever_ref01_data_dt0_load_result = helpers.to_map(oldest_ever_ref01_data_dt0_loaded)
        assert oldest_ever_ref01_data_dt0_load_result is not None
        assert oldest_ever_ref01_data_dt0_load_result["id"] == oldest_ever_ref01_data["id"]



def _oldest_ever_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/oldest_ever/OldestEverTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = OldestPeopleRecordsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["oldest_ever01", "oldest_ever02", "oldest_ever03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID": idmap,
        "OLDESTPEOPLERECORDS_TEST_LIVE": "FALSE",
        "OLDESTPEOPLERECORDS_TEST_EXPLAIN": "FALSE",
        "OLDESTPEOPLERECORDS_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("OLDESTPEOPLERECORDS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("OLDESTPEOPLERECORDS_APIKEY"),
            },
            extra or {},
        ])
        client = OldestPeopleRecordsSDK(helpers.to_map(merged_opts))

    _live = env.get("OLDESTPEOPLERECORDS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("OLDESTPEOPLERECORDS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
