# OldestPeopleRecords SDK configuration

module OldestPeopleRecordsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "OldestPeopleRecords",
        "slug" => "oldest-people-records",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://whoistheoldest.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "oldest_ever" => {},
          "oldest_living" => {},
        },
      },
      "entity" => {
        "oldest_ever" => {
          "fields" => [
            {
              "name" => "age",
              "req" => true,
              "short" => "Age in years",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "date",
              "name" => "birthDate",
              "req" => true,
              "short" => "Date of birth in ISO 8601 format",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "req" => true,
              "short" => "Country of origin",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "deathDate",
              "short" => "Date of death in ISO 8601 format (null if still living)",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Unique identifier for the person",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "lastUpdated",
              "short" => "Timestamp of last update",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Full name of the person",
              "type" => "`$STRING`",
            },
            {
              "name" => "verified",
              "short" => "Whether the record has been verified",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "oldest_ever",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "birth_date_after",
                        "orig" => "birth_date_after",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "birth_date_before",
                        "orig" => "birth_date_before",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/oldest-ever",
                  "segments" => [
                    {
                      "lit" => "oldest-ever",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "birth_date_after",
                      "birth_date_before",
                      "country",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "oldest-ever",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/oldest-ever",
                  "segments" => [
                    {
                      "lit" => "oldest-ever",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "oldest-ever",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "oldest_living" => {
          "fields" => [
            {
              "name" => "age",
              "req" => true,
              "short" => "Age in years",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "date",
              "name" => "birthDate",
              "req" => true,
              "short" => "Date of birth in ISO 8601 format",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "req" => true,
              "short" => "Country of origin",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "deathDate",
              "short" => "Date of death in ISO 8601 format (null if still living)",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Unique identifier for the person",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "lastUpdated",
              "short" => "Timestamp of last update",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Full name of the person",
              "type" => "`$STRING`",
            },
            {
              "name" => "verified",
              "short" => "Whether the record has been verified",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "oldest_living",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "birth_date_after",
                        "orig" => "birth_date_after",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "birth_date_before",
                        "orig" => "birth_date_before",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/oldest-living",
                  "segments" => [
                    {
                      "lit" => "oldest-living",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "birth_date_after",
                      "birth_date_before",
                      "country",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "oldest-living",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/oldest-living",
                  "segments" => [
                    {
                      "lit" => "oldest-living",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "oldest-living",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OldestPeopleRecordsFeatures.make_feature(name)
  end
end
