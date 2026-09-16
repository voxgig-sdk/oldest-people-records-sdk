# OldestPeopleRecords SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OldestPeopleRecordsFeatures
  def self.make_feature(name)
    case name
    when "base"
      OldestPeopleRecordsBaseFeature.new
    when "ratelimit"
      OldestPeopleRecordsRatelimitFeature.new
    when "retry"
      OldestPeopleRecordsRetryFeature.new
    when "test"
      OldestPeopleRecordsTestFeature.new
    when "timeout"
      OldestPeopleRecordsTimeoutFeature.new
    else
      OldestPeopleRecordsBaseFeature.new
    end
  end
end
