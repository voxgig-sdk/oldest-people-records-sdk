-- ProjectName SDK exists test

local sdk = require("oldest-people-records_sdk")

describe("OldestPeopleRecordsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
