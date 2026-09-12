"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'OldestPeopleRecords',
        slug: "oldest-people-records",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://whoistheoldest.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            oldest_ever: {},
            oldest_living: {},
        }
    };
    entity = {
        "oldest_ever": {
            "fields": [
                {
                    "name": "age",
                    "req": true,
                    "short": "Age in years",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date",
                    "name": "birthDate",
                    "req": true,
                    "short": "Date of birth in ISO 8601 format",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "req": true,
                    "short": "Country of origin",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "deathDate",
                    "short": "Date of death in ISO 8601 format (null if still living)",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "req": true,
                    "short": "Unique identifier for the person",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "lastUpdated",
                    "short": "Timestamp of last update",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "req": true,
                    "short": "Full name of the person",
                    "type": "`$STRING`"
                },
                {
                    "name": "verified",
                    "short": "Whether the record has been verified",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "oldest_ever",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "birth_date_after",
                                        "orig": "birth_date_after",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "birth_date_before",
                                        "orig": "birth_date_before",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/oldest-ever",
                            "segments": [
                                {
                                    "lit": "oldest-ever"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "birth_date_after",
                                    "birth_date_before",
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "oldest-ever"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/oldest-ever",
                            "segments": [
                                {
                                    "lit": "oldest-ever"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "oldest-ever"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "oldest_living": {
            "fields": [
                {
                    "name": "age",
                    "req": true,
                    "short": "Age in years",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date",
                    "name": "birthDate",
                    "req": true,
                    "short": "Date of birth in ISO 8601 format",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "req": true,
                    "short": "Country of origin",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "deathDate",
                    "short": "Date of death in ISO 8601 format (null if still living)",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "req": true,
                    "short": "Unique identifier for the person",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "lastUpdated",
                    "short": "Timestamp of last update",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "req": true,
                    "short": "Full name of the person",
                    "type": "`$STRING`"
                },
                {
                    "name": "verified",
                    "short": "Whether the record has been verified",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "oldest_living",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "birth_date_after",
                                        "orig": "birth_date_after",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "birth_date_before",
                                        "orig": "birth_date_before",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/oldest-living",
                            "segments": [
                                {
                                    "lit": "oldest-living"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "birth_date_after",
                                    "birth_date_before",
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "oldest-living"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/oldest-living",
                            "segments": [
                                {
                                    "lit": "oldest-living"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "oldest-living"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map