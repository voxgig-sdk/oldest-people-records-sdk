<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OldestPeopleRecordsUtility::setRegistrar(function (OldestPeopleRecordsUtility $u): void {
    $u->clean = [OldestPeopleRecordsClean::class, 'call'];
    $u->done = [OldestPeopleRecordsDone::class, 'call'];
    $u->make_error = [OldestPeopleRecordsMakeError::class, 'call'];
    $u->feature_add = [OldestPeopleRecordsFeatureAdd::class, 'call'];
    $u->feature_hook = [OldestPeopleRecordsFeatureHook::class, 'call'];
    $u->feature_init = [OldestPeopleRecordsFeatureInit::class, 'call'];
    $u->fetcher = [OldestPeopleRecordsFetcher::class, 'call'];
    $u->make_fetch_def = [OldestPeopleRecordsMakeFetchDef::class, 'call'];
    $u->make_context = [OldestPeopleRecordsMakeContext::class, 'call'];
    $u->make_options = [OldestPeopleRecordsMakeOptions::class, 'call'];
    $u->make_request = [OldestPeopleRecordsMakeRequest::class, 'call'];
    $u->make_response = [OldestPeopleRecordsMakeResponse::class, 'call'];
    $u->make_result = [OldestPeopleRecordsMakeResult::class, 'call'];
    $u->make_point = [OldestPeopleRecordsMakePoint::class, 'call'];
    $u->make_spec = [OldestPeopleRecordsMakeSpec::class, 'call'];
    $u->make_url = [OldestPeopleRecordsMakeUrl::class, 'call'];
    $u->param = [OldestPeopleRecordsParam::class, 'call'];
    $u->prepare_auth = [OldestPeopleRecordsPrepareAuth::class, 'call'];
    $u->prepare_body = [OldestPeopleRecordsPrepareBody::class, 'call'];
    $u->prepare_headers = [OldestPeopleRecordsPrepareHeaders::class, 'call'];
    $u->prepare_method = [OldestPeopleRecordsPrepareMethod::class, 'call'];
    $u->prepare_params = [OldestPeopleRecordsPrepareParams::class, 'call'];
    $u->prepare_path = [OldestPeopleRecordsPreparePath::class, 'call'];
    $u->prepare_query = [OldestPeopleRecordsPrepareQuery::class, 'call'];
    $u->result_basic = [OldestPeopleRecordsResultBasic::class, 'call'];
    $u->result_body = [OldestPeopleRecordsResultBody::class, 'call'];
    $u->result_headers = [OldestPeopleRecordsResultHeaders::class, 'call'];
    $u->transform_request = [OldestPeopleRecordsTransformRequest::class, 'call'];
    $u->transform_response = [OldestPeopleRecordsTransformResponse::class, 'call'];
});
