# OldestPeopleRecords SDK utility: feature_add
module OldestPeopleRecordsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
