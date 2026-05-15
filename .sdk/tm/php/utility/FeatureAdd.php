<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility: feature_add

class OldestPeopleRecordsFeatureAdd
{
    public static function call(OldestPeopleRecordsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
