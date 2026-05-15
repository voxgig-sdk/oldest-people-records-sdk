<?php
declare(strict_types=1);

// OldestPeopleRecords SDK base feature

class OldestPeopleRecordsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OldestPeopleRecordsContext $ctx, array $options): void {}
    public function PostConstruct(OldestPeopleRecordsContext $ctx): void {}
    public function PostConstructEntity(OldestPeopleRecordsContext $ctx): void {}
    public function SetData(OldestPeopleRecordsContext $ctx): void {}
    public function GetData(OldestPeopleRecordsContext $ctx): void {}
    public function GetMatch(OldestPeopleRecordsContext $ctx): void {}
    public function SetMatch(OldestPeopleRecordsContext $ctx): void {}
    public function PrePoint(OldestPeopleRecordsContext $ctx): void {}
    public function PreSpec(OldestPeopleRecordsContext $ctx): void {}
    public function PreRequest(OldestPeopleRecordsContext $ctx): void {}
    public function PreResponse(OldestPeopleRecordsContext $ctx): void {}
    public function PreResult(OldestPeopleRecordsContext $ctx): void {}
    public function PreDone(OldestPeopleRecordsContext $ctx): void {}
    public function PreUnexpected(OldestPeopleRecordsContext $ctx): void {}
}
