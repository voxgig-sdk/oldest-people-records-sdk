-- OldestPeopleRecords SDK error

local OldestPeopleRecordsError = {}
OldestPeopleRecordsError.__index = OldestPeopleRecordsError


function OldestPeopleRecordsError.new(code, msg, ctx)
  local self = setmetatable({}, OldestPeopleRecordsError)
  self.is_sdk_error = true
  self.sdk = "OldestPeopleRecords"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OldestPeopleRecordsError:error()
  return self.msg
end


function OldestPeopleRecordsError:__tostring()
  return self.msg
end


return OldestPeopleRecordsError
