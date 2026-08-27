package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OldestPeopleRecords",
			"slug": "oldest-people-records",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://whoistheoldest.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"oldest_ever": map[string]any{},
				"oldest_living": map[string]any{},
			},
		},
		"entity": map[string]any{
			"oldest_ever": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"req": true,
						"short": "Age in years",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "birthDate",
						"req": true,
						"short": "Date of birth in ISO 8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deathDate",
						"short": "Date of death in ISO 8601 format (null if still living)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"short": "Timestamp of last update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Full name of the person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"short": "Whether the record has been verified",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "oldest_ever",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "birth_date_after",
											"orig": "birth_date_after",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "birth_date_before",
											"orig": "birth_date_before",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/oldest-ever",
								"parts": []any{
									"oldest-ever",
								},
								"select": map[string]any{
									"exist": []any{
										"birth_date_after",
										"birth_date_before",
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "PUT",
								"orig": "/oldest-ever",
								"parts": []any{
									"oldest-ever",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"oldest_living": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"req": true,
						"short": "Age in years",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "birthDate",
						"req": true,
						"short": "Date of birth in ISO 8601 format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deathDate",
						"short": "Date of death in ISO 8601 format (null if still living)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"short": "Timestamp of last update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Full name of the person",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"short": "Whether the record has been verified",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "oldest_living",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "birth_date_after",
											"orig": "birth_date_after",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "birth_date_before",
											"orig": "birth_date_before",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/oldest-living",
								"parts": []any{
									"oldest-living",
								},
								"select": map[string]any{
									"exist": []any{
										"birth_date_after",
										"birth_date_before",
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "PUT",
								"orig": "/oldest-living",
								"parts": []any{
									"oldest-living",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
