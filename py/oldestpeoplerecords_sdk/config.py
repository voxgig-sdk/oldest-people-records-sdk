# OldestPeopleRecords SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "OldestPeopleRecords",
            "slug": "oldest-people-records",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://whoistheoldest.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "oldest_ever": {},
                "oldest_living": {},
            },
        },
        "entity": {
      "oldest_ever": {
        "fields": [
          {
            "name": "age",
            "req": True,
            "short": "Age in years",
            "type": "`$INTEGER`",
          },
          {
            "format": "date",
            "name": "birthDate",
            "req": True,
            "short": "Date of birth in ISO 8601 format",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "req": True,
            "short": "Country of origin",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "deathDate",
            "short": "Date of death in ISO 8601 format (null if still living)",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the person",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "lastUpdated",
            "short": "Timestamp of last update",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Full name of the person",
            "type": "`$STRING`",
          },
          {
            "name": "verified",
            "short": "Whether the record has been verified",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "birth_date_before",
                      "orig": "birth_date_before",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/oldest-ever",
                "segments": [
                  {
                    "lit": "oldest-ever",
                  },
                ],
                "select": {
                  "exist": [
                    "birth_date_after",
                    "birth_date_before",
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "oldest-ever",
                ],
              },
            ],
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
                    "lit": "oldest-ever",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "oldest-ever",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "oldest_living": {
        "fields": [
          {
            "name": "age",
            "req": True,
            "short": "Age in years",
            "type": "`$INTEGER`",
          },
          {
            "format": "date",
            "name": "birthDate",
            "req": True,
            "short": "Date of birth in ISO 8601 format",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "req": True,
            "short": "Country of origin",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "deathDate",
            "short": "Date of death in ISO 8601 format (null if still living)",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the person",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "lastUpdated",
            "short": "Timestamp of last update",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Full name of the person",
            "type": "`$STRING`",
          },
          {
            "name": "verified",
            "short": "Whether the record has been verified",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "birth_date_before",
                      "orig": "birth_date_before",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/oldest-living",
                "segments": [
                  {
                    "lit": "oldest-living",
                  },
                ],
                "select": {
                  "exist": [
                    "birth_date_after",
                    "birth_date_before",
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "oldest-living",
                ],
              },
            ],
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
                    "lit": "oldest-living",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "oldest-living",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
