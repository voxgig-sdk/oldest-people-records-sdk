package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/oldest-people-records-sdk/go"
	"github.com/voxgig-sdk/oldest-people-records-sdk/go/core"

	vs "github.com/voxgig-sdk/oldest-people-records-sdk/go/utility/struct"
)

func TestOldestEverEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OldestEver(nil)
		if ent == nil {
			t.Fatal("expected non-nil OldestEverEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := oldest_everBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "oldest_ever." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		oldestEverRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.oldest_ever", setup.data)))
		var oldestEverRef01Data map[string]any
		if len(oldestEverRef01DataRaw) > 0 {
			oldestEverRef01Data = core.ToMapAny(oldestEverRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = oldestEverRef01Data

		// UPDATE
		oldestEverRef01Ent := client.OldestEver(nil)
		oldestEverRef01DataUp0Up := map[string]any{
			"id": oldestEverRef01Data["id"],
		}

		oldestEverRef01MarkdefUp0Name := "birth_date"
		oldestEverRef01MarkdefUp0Value := fmt.Sprintf("Mark01-oldest_ever_ref01_%d", setup.now)
		oldestEverRef01DataUp0Up[oldestEverRef01MarkdefUp0Name] = oldestEverRef01MarkdefUp0Value

		oldestEverRef01ResdataUp0Result, err := oldestEverRef01Ent.Update(oldestEverRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		oldestEverRef01ResdataUp0 := core.ToMapAny(oldestEverRef01ResdataUp0Result)
		if oldestEverRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if oldestEverRef01ResdataUp0["id"] != oldestEverRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if oldestEverRef01ResdataUp0[oldestEverRef01MarkdefUp0Name] != oldestEverRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", oldestEverRef01MarkdefUp0Name, oldestEverRef01ResdataUp0[oldestEverRef01MarkdefUp0Name])
		}

		// LOAD
		oldestEverRef01MatchDt0 := map[string]any{
			"id": oldestEverRef01Data["id"],
		}
		oldestEverRef01DataDt0Loaded, err := oldestEverRef01Ent.Load(oldestEverRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		oldestEverRef01DataDt0LoadResult := core.ToMapAny(oldestEverRef01DataDt0Loaded)
		if oldestEverRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if oldestEverRef01DataDt0LoadResult["id"] != oldestEverRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func oldest_everBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "oldest_ever", "OldestEverTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read oldest_ever test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse oldest_ever test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"oldest_ever01", "oldest_ever02", "oldest_ever03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID": idmap,
		"OLDESTPEOPLERECORDS_TEST_LIVE":      "FALSE",
		"OLDESTPEOPLERECORDS_TEST_EXPLAIN":   "FALSE",
		"OLDESTPEOPLERECORDS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OLDESTPEOPLERECORDS_TEST_OLDEST_EVER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OLDESTPEOPLERECORDS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOldestPeopleRecordsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OLDESTPEOPLERECORDS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
