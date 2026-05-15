package = "voxgig-sdk-oldest-people-records"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/oldest-people-records-sdk.git"
}
description = {
  summary = "OldestPeopleRecords SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["oldest-people-records_sdk"] = "oldest-people-records_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
