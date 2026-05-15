<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility: result_body

class OldestPeopleRecordsResultBody
{
    public static function call(OldestPeopleRecordsContext $ctx): ?OldestPeopleRecordsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
