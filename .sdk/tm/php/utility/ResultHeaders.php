<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility: result_headers

class OldestPeopleRecordsResultHeaders
{
    public static function call(OldestPeopleRecordsContext $ctx): ?OldestPeopleRecordsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
