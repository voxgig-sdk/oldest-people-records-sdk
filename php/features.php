<?php
declare(strict_types=1);

// OldestPeopleRecords SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OldestPeopleRecordsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OldestPeopleRecordsBaseFeature();
            case "test":
                return new OldestPeopleRecordsTestFeature();
            default:
                return new OldestPeopleRecordsBaseFeature();
        }
    }
}
