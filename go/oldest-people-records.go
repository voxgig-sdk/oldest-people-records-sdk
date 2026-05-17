package voxgigoldestpeoplerecordssdk

import (
	"github.com/voxgig-sdk/oldest-people-records-sdk/go/core"
	"github.com/voxgig-sdk/oldest-people-records-sdk/go/entity"
	"github.com/voxgig-sdk/oldest-people-records-sdk/go/feature"
	_ "github.com/voxgig-sdk/oldest-people-records-sdk/go/utility"
)

// Type aliases preserve external API.
type OldestPeopleRecordsSDK = core.OldestPeopleRecordsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OldestPeopleRecordsEntity = core.OldestPeopleRecordsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OldestPeopleRecordsError = core.OldestPeopleRecordsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewOldestEverEntityFunc = func(client *core.OldestPeopleRecordsSDK, entopts map[string]any) core.OldestPeopleRecordsEntity {
		return entity.NewOldestEverEntity(client, entopts)
	}
	core.NewOldestLivingEntityFunc = func(client *core.OldestPeopleRecordsSDK, entopts map[string]any) core.OldestPeopleRecordsEntity {
		return entity.NewOldestLivingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOldestPeopleRecordsSDK = core.NewOldestPeopleRecordsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
