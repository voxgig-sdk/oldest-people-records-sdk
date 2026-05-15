<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility: prepare_body

class OldestPeopleRecordsPrepareBody
{
    public static function call(OldestPeopleRecordsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
