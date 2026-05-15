package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewOldestEverEntityFunc func(client *OldestPeopleRecordsSDK, entopts map[string]any) OldestPeopleRecordsEntity

var NewOldestLivingEntityFunc func(client *OldestPeopleRecordsSDK, entopts map[string]any) OldestPeopleRecordsEntity

