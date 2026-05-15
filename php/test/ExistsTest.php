<?php
declare(strict_types=1);

// OldestPeopleRecords SDK exists test

require_once __DIR__ . '/../oldestpeoplerecords_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OldestPeopleRecordsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
