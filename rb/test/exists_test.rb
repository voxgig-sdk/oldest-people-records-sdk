# OldestPeopleRecords SDK exists test

require "minitest/autorun"
require_relative "../OldestPeopleRecords_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OldestPeopleRecordsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
