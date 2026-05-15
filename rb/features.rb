# OldestPeopleRecords SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OldestPeopleRecordsFeatures
  def self.make_feature(name)
    case name
    when "base"
      OldestPeopleRecordsBaseFeature.new
    when "test"
      OldestPeopleRecordsTestFeature.new
    else
      OldestPeopleRecordsBaseFeature.new
    end
  end
end
