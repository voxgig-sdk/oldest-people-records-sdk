<?php
declare(strict_types=1);

// OldestPeopleRecords SDK configuration

class OldestPeopleRecordsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OldestPeopleRecords",
                "slug" => "oldest-people-records",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://whoistheoldest.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "oldest_ever" => [],
                    "oldest_living" => [],
                ],
            ],
            "entity" => [
        'oldest_ever' => [
          'fields' => [
            [
              'name' => 'age',
              'req' => true,
              'short' => 'Age in years',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'birthDate',
              'req' => true,
              'short' => 'Date of birth in ISO 8601 format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'req' => true,
              'short' => 'Country of origin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'deathDate',
              'short' => 'Date of death in ISO 8601 format (null if still living)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the person',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastUpdated',
              'short' => 'Timestamp of last update',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Full name of the person',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'verified',
              'short' => 'Whether the record has been verified',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'oldest_ever',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'birth_date_after',
                        'orig' => 'birth_date_after',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'birth_date_before',
                        'orig' => 'birth_date_before',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/oldest-ever',
                  'parts' => [
                    'oldest-ever',
                  ],
                  'select' => [
                    'exist' => [
                      'birth_date_after',
                      'birth_date_before',
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/oldest-ever',
                  'parts' => [
                    'oldest-ever',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'oldest_living' => [
          'fields' => [
            [
              'name' => 'age',
              'req' => true,
              'short' => 'Age in years',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'birthDate',
              'req' => true,
              'short' => 'Date of birth in ISO 8601 format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'req' => true,
              'short' => 'Country of origin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'deathDate',
              'short' => 'Date of death in ISO 8601 format (null if still living)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the person',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastUpdated',
              'short' => 'Timestamp of last update',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Full name of the person',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'verified',
              'short' => 'Whether the record has been verified',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'oldest_living',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'birth_date_after',
                        'orig' => 'birth_date_after',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'birth_date_before',
                        'orig' => 'birth_date_before',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/oldest-living',
                  'parts' => [
                    'oldest-living',
                  ],
                  'select' => [
                    'exist' => [
                      'birth_date_after',
                      'birth_date_before',
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/oldest-living',
                  'parts' => [
                    'oldest-living',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OldestPeopleRecordsFeatures::make_feature($name);
    }
}
