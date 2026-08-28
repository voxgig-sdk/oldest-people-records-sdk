// Typed models for the OldestPeopleRecords SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface OldestEver {
  age: number
  birthDate: string
  country: string
  deathDate?: string
  id: string
  lastUpdated?: string
  name: string
  verified?: boolean
}

export interface OldestEverLoadMatch {
  birth_date_after?: string
  birth_date_before?: string
  country?: string
}

export interface OldestEverUpdateData {
  age?: number
  birthDate?: string
  country?: string
  deathDate?: string
  id?: string
  lastUpdated?: string
  name?: string
  verified?: boolean
}

export interface OldestLiving {
  age: number
  birthDate: string
  country: string
  deathDate?: string
  id: string
  lastUpdated?: string
  name: string
  verified?: boolean
}

export interface OldestLivingLoadMatch {
  birth_date_after?: string
  birth_date_before?: string
  country?: string
}

export interface OldestLivingUpdateData {
  age?: number
  birthDate?: string
  country?: string
  deathDate?: string
  id?: string
  lastUpdated?: string
  name?: string
  verified?: boolean
}

