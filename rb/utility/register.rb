# OldestPeopleRecords SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OldestPeopleRecordsUtility.registrar = ->(u) {
  u.clean = OldestPeopleRecordsUtilities::Clean
  u.done = OldestPeopleRecordsUtilities::Done
  u.make_error = OldestPeopleRecordsUtilities::MakeError
  u.feature_add = OldestPeopleRecordsUtilities::FeatureAdd
  u.feature_hook = OldestPeopleRecordsUtilities::FeatureHook
  u.feature_init = OldestPeopleRecordsUtilities::FeatureInit
  u.fetcher = OldestPeopleRecordsUtilities::Fetcher
  u.make_fetch_def = OldestPeopleRecordsUtilities::MakeFetchDef
  u.make_context = OldestPeopleRecordsUtilities::MakeContext
  u.make_options = OldestPeopleRecordsUtilities::MakeOptions
  u.make_request = OldestPeopleRecordsUtilities::MakeRequest
  u.make_response = OldestPeopleRecordsUtilities::MakeResponse
  u.make_result = OldestPeopleRecordsUtilities::MakeResult
  u.make_point = OldestPeopleRecordsUtilities::MakePoint
  u.make_spec = OldestPeopleRecordsUtilities::MakeSpec
  u.make_url = OldestPeopleRecordsUtilities::MakeUrl
  u.param = OldestPeopleRecordsUtilities::Param
  u.prepare_auth = OldestPeopleRecordsUtilities::PrepareAuth
  u.prepare_body = OldestPeopleRecordsUtilities::PrepareBody
  u.prepare_headers = OldestPeopleRecordsUtilities::PrepareHeaders
  u.prepare_method = OldestPeopleRecordsUtilities::PrepareMethod
  u.prepare_params = OldestPeopleRecordsUtilities::PrepareParams
  u.prepare_path = OldestPeopleRecordsUtilities::PreparePath
  u.prepare_query = OldestPeopleRecordsUtilities::PrepareQuery
  u.result_basic = OldestPeopleRecordsUtilities::ResultBasic
  u.result_body = OldestPeopleRecordsUtilities::ResultBody
  u.result_headers = OldestPeopleRecordsUtilities::ResultHeaders
  u.transform_request = OldestPeopleRecordsUtilities::TransformRequest
  u.transform_response = OldestPeopleRecordsUtilities::TransformResponse
}
