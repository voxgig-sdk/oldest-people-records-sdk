// Typed models for the OldestPeopleRecords SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface OldestEver {
  age: number
  birth_date: string
  country: string
  death_date?: string
  id: string
  last_updated?: string
  name: string
  verified?: boolean
}

export interface OldestEverLoadMatch {
  age?: number
  birth_date?: string
  country?: string
  death_date?: string
  id: string
  last_updated?: string
  name?: string
  verified?: boolean
}

export interface OldestEverUpdateData {
  age?: number
  birth_date?: string
  country?: string
  death_date?: string
  id?: string
  last_updated?: string
  name?: string
  verified?: boolean
}

export interface OldestLiving {
  age: number
  birth_date: string
  country: string
  death_date?: string
  id: string
  last_updated?: string
  name: string
  verified?: boolean
}

export interface OldestLivingLoadMatch {
  age?: number
  birth_date?: string
  country?: string
  death_date?: string
  id: string
  last_updated?: string
  name?: string
  verified?: boolean
}

export interface OldestLivingUpdateData {
  age?: number
  birth_date?: string
  country?: string
  death_date?: string
  id?: string
  last_updated?: string
  name?: string
  verified?: boolean
}

