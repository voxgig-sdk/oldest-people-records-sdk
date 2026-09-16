-- OldestPeopleRecords SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OldestPeopleRecords",
      slug = "oldest-people-records",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://whoistheoldest.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["oldest_ever"] = {},
        ["oldest_living"] = {},
      },
    },
    entity = {
      ["oldest_ever"] = {
        ["fields"] = {
          {
            ["name"] = "age",
            ["req"] = true,
            ["short"] = "Age in years",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date",
            ["name"] = "birthDate",
            ["req"] = true,
            ["short"] = "Date of birth in ISO 8601 format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["short"] = "Country of origin",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "deathDate",
            ["short"] = "Date of death in ISO 8601 format (null if still living)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the person",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "lastUpdated",
            ["short"] = "Timestamp of last update",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Full name of the person",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "verified",
            ["short"] = "Whether the record has been verified",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "oldest_ever",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "birth_date_after",
                      ["orig"] = "birth_date_after",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "birth_date_before",
                      ["orig"] = "birth_date_before",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/oldest-ever",
                ["segments"] = {
                  {
                    ["lit"] = "oldest-ever",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "birth_date_after",
                    "birth_date_before",
                    "country",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "oldest-ever",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/oldest-ever",
                ["segments"] = {
                  {
                    ["lit"] = "oldest-ever",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "oldest-ever",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["oldest_living"] = {
        ["fields"] = {
          {
            ["name"] = "age",
            ["req"] = true,
            ["short"] = "Age in years",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date",
            ["name"] = "birthDate",
            ["req"] = true,
            ["short"] = "Date of birth in ISO 8601 format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["short"] = "Country of origin",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "deathDate",
            ["short"] = "Date of death in ISO 8601 format (null if still living)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the person",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "lastUpdated",
            ["short"] = "Timestamp of last update",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Full name of the person",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "verified",
            ["short"] = "Whether the record has been verified",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "oldest_living",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "birth_date_after",
                      ["orig"] = "birth_date_after",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "birth_date_before",
                      ["orig"] = "birth_date_before",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/oldest-living",
                ["segments"] = {
                  {
                    ["lit"] = "oldest-living",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "birth_date_after",
                    "birth_date_before",
                    "country",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "oldest-living",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/oldest-living",
                ["segments"] = {
                  {
                    ["lit"] = "oldest-living",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "oldest-living",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
