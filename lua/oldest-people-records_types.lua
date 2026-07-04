-- Typed models for the OldestPeopleRecords SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class OldestEver
---@field age number
---@field birth_date string
---@field country string
---@field death_date? string
---@field id string
---@field last_updated? string
---@field name string
---@field verified? boolean

---@class OldestEverLoadMatch

---@class OldestEverUpdateData

---@class OldestLiving
---@field age number
---@field birth_date string
---@field country string
---@field death_date? string
---@field id string
---@field last_updated? string
---@field name string
---@field verified? boolean

---@class OldestLivingLoadMatch

---@class OldestLivingUpdateData

local M = {}

return M
