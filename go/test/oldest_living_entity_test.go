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

func TestOldestLivingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OldestLiving(nil)
		if ent == nil {
			t.Fatal("expected non-nil OldestLivingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := oldest_livingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "oldest_living." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OLDESTPEOPLERECORDS_TEST_OLDEST_LIVING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		oldestLivingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.oldest_living", setup.data)))
		var oldestLivingRef01Data map[string]any
		if len(oldestLivingRef01DataRaw) > 0 {
			oldestLivingRef01Data = core.ToMapAny(oldestLivingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = oldestLivingRef01Data

		// UPDATE
		oldestLivingRef01Ent := client.OldestLiving(nil)
		oldestLivingRef01DataUp0Up := map[string]any{
			"id": oldestLivingRef01Data["id"],
		}

		oldestLivingRef01MarkdefUp0Name := "birth_date"
		oldestLivingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-oldest_living_ref01_%d", setup.now)
		oldestLivingRef01DataUp0Up[oldestLivingRef01MarkdefUp0Name] = oldestLivingRef01MarkdefUp0Value

		oldestLivingRef01ResdataUp0Result, err := oldestLivingRef01Ent.Update(oldestLivingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		oldestLivingRef01ResdataUp0 := core.ToMapAny(oldestLivingRef01ResdataUp0Result)
		if oldestLivingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if oldestLivingRef01ResdataUp0["id"] != oldestLivingRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if oldestLivingRef01ResdataUp0[oldestLivingRef01MarkdefUp0Name] != oldestLivingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", oldestLivingRef01MarkdefUp0Name, oldestLivingRef01ResdataUp0[oldestLivingRef01MarkdefUp0Name])
		}

		// LOAD
		oldestLivingRef01MatchDt0 := map[string]any{
			"id": oldestLivingRef01Data["id"],
		}
		oldestLivingRef01DataDt0Loaded, err := oldestLivingRef01Ent.Load(oldestLivingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		oldestLivingRef01DataDt0LoadResult := core.ToMapAny(oldestLivingRef01DataDt0Loaded)
		if oldestLivingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if oldestLivingRef01DataDt0LoadResult["id"] != oldestLivingRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func oldest_livingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "oldest_living", "OldestLivingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read oldest_living test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse oldest_living test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"oldest_living01", "oldest_living02", "oldest_living03"},
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
	entidEnvRaw := os.Getenv("OLDESTPEOPLERECORDS_TEST_OLDEST_LIVING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OLDESTPEOPLERECORDS_TEST_OLDEST_LIVING_ENTID": idmap,
		"OLDESTPEOPLERECORDS_TEST_LIVE":      "FALSE",
		"OLDESTPEOPLERECORDS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OLDESTPEOPLERECORDS_TEST_OLDEST_LIVING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OLDESTPEOPLERECORDS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
