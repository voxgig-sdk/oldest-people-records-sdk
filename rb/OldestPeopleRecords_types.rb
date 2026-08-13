# frozen_string_literal: true

# Typed models for the OldestPeopleRecords SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# OldestEver entity data model.
#
# @!attribute [rw] age
#   @return [Integer]
#
# @!attribute [rw] birthDate
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestEver = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

# Request payload for OldestEver#load.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] birthDate
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestEverLoadMatch = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

# Request payload for OldestEver#update.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] birthDate
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestEverUpdateData = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

# OldestLiving entity data model.
#
# @!attribute [rw] age
#   @return [Integer]
#
# @!attribute [rw] birthDate
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestLiving = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

# Request payload for OldestLiving#load.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] birthDate
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestLivingLoadMatch = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

# Request payload for OldestLiving#update.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] birthDate
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] deathDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OldestLivingUpdateData = Struct.new(
  :age,
  :birthDate,
  :country,
  :deathDate,
  :id,
  :lastUpdated,
  :name,
  :verified,
  keyword_init: true
)

