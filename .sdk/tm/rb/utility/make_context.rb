# OldestPeopleRecords SDK utility: make_context
require_relative '../core/context'
module OldestPeopleRecordsUtilities
  MakeContext = ->(ctxmap, basectx) {
    OldestPeopleRecordsContext.new(ctxmap, basectx)
  }
end
