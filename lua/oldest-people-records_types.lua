-- Typed models for the OldestPeopleRecords SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class OldestEver
---@field age number
---@field birthDate string
---@field country string
---@field deathDate? string
---@field id string
---@field lastUpdated? string
---@field name string
---@field verified? boolean

---@class OldestEverLoadMatch
---@field birth_date_after? string
---@field birth_date_before? string
---@field country? string

---@class OldestEverUpdateData
---@field age? number
---@field birthDate? string
---@field country? string
---@field deathDate? string
---@field id? string
---@field lastUpdated? string
---@field name? string
---@field verified? boolean

---@class OldestLiving
---@field age number
---@field birthDate string
---@field country string
---@field deathDate? string
---@field id string
---@field lastUpdated? string
---@field name string
---@field verified? boolean

---@class OldestLivingLoadMatch
---@field birth_date_after? string
---@field birth_date_before? string
---@field country? string

---@class OldestLivingUpdateData
---@field age? number
---@field birthDate? string
---@field country? string
---@field deathDate? string
---@field id? string
---@field lastUpdated? string
---@field name? string
---@field verified? boolean

local M = {}

return M
