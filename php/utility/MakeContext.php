<?php
declare(strict_types=1);

// OldestPeopleRecords SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OldestPeopleRecordsMakeContext
{
    public static function call(array $ctxmap, ?OldestPeopleRecordsContext $basectx): OldestPeopleRecordsContext
    {
        return new OldestPeopleRecordsContext($ctxmap, $basectx);
    }
}
