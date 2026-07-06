<?php
declare(strict_types=1);

// Typed models for the OldestPeopleRecords SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** OldestEver entity data model. */
class OldestEver
{
    public int $age;
    public string $birth_date;
    public string $country;
    public ?string $death_date = null;
    public string $id;
    public ?string $last_updated = null;
    public string $name;
    public ?bool $verified = null;
}

/** Request payload for OldestEver#load. */
class OldestEverLoadMatch
{
    public ?int $age = null;
    public ?string $birth_date = null;
    public ?string $country = null;
    public ?string $death_date = null;
    public string $id;
    public ?string $last_updated = null;
    public ?string $name = null;
    public ?bool $verified = null;
}

/** Request payload for OldestEver#update. */
class OldestEverUpdateData
{
    public ?int $age = null;
    public ?string $birth_date = null;
    public ?string $country = null;
    public ?string $death_date = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?string $name = null;
    public ?bool $verified = null;
}

/** OldestLiving entity data model. */
class OldestLiving
{
    public int $age;
    public string $birth_date;
    public string $country;
    public ?string $death_date = null;
    public string $id;
    public ?string $last_updated = null;
    public string $name;
    public ?bool $verified = null;
}

/** Request payload for OldestLiving#load. */
class OldestLivingLoadMatch
{
    public ?int $age = null;
    public ?string $birth_date = null;
    public ?string $country = null;
    public ?string $death_date = null;
    public string $id;
    public ?string $last_updated = null;
    public ?string $name = null;
    public ?bool $verified = null;
}

/** Request payload for OldestLiving#update. */
class OldestLivingUpdateData
{
    public ?int $age = null;
    public ?string $birth_date = null;
    public ?string $country = null;
    public ?string $death_date = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?string $name = null;
    public ?bool $verified = null;
}

