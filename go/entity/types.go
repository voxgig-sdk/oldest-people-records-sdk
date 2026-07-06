// Typed models for the OldestPeopleRecords SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// OldestEver is the typed data model for the oldest_ever entity.
type OldestEver struct {
	Age int `json:"age"`
	BirthDate string `json:"birth_date"`
	Country string `json:"country"`
	DeathDate *string `json:"death_date,omitempty"`
	Id string `json:"id"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name string `json:"name"`
	Verified *bool `json:"verified,omitempty"`
}

// OldestEverLoadMatch is the typed request payload for OldestEver.LoadTyped.
type OldestEverLoadMatch struct {
	Age *int `json:"age,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Country *string `json:"country,omitempty"`
	DeathDate *string `json:"death_date,omitempty"`
	Id string `json:"id"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name *string `json:"name,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// OldestEverUpdateData is the typed request payload for OldestEver.UpdateTyped.
type OldestEverUpdateData struct {
	Age *int `json:"age,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Country *string `json:"country,omitempty"`
	DeathDate *string `json:"death_date,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name *string `json:"name,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// OldestLiving is the typed data model for the oldest_living entity.
type OldestLiving struct {
	Age int `json:"age"`
	BirthDate string `json:"birth_date"`
	Country string `json:"country"`
	DeathDate *string `json:"death_date,omitempty"`
	Id string `json:"id"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name string `json:"name"`
	Verified *bool `json:"verified,omitempty"`
}

// OldestLivingLoadMatch is the typed request payload for OldestLiving.LoadTyped.
type OldestLivingLoadMatch struct {
	Age *int `json:"age,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Country *string `json:"country,omitempty"`
	DeathDate *string `json:"death_date,omitempty"`
	Id string `json:"id"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name *string `json:"name,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// OldestLivingUpdateData is the typed request payload for OldestLiving.UpdateTyped.
type OldestLivingUpdateData struct {
	Age *int `json:"age,omitempty"`
	BirthDate *string `json:"birth_date,omitempty"`
	Country *string `json:"country,omitempty"`
	DeathDate *string `json:"death_date,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	Name *string `json:"name,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
