
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'OldestPeopleRecords',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://whoistheoldest.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      oldest_ever: {
      },

      oldest_living: {
      },

    }
  }


  entity = {
    "oldest_ever": {
      "fields": [
        {
          "name": "age",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "birthDate",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "deathDate",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "verified",
          "type": "`$BOOLEAN`"
        }
      ],
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
              "parts": [
                "oldest-ever"
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
              }
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
              "parts": [
                "oldest-ever"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$INTEGER`"
        },
        {
          "name": "birthDate",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "deathDate",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "verified",
          "type": "`$BOOLEAN`"
        }
      ],
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
              "parts": [
                "oldest-living"
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
              }
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
              "parts": [
                "oldest-living"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

