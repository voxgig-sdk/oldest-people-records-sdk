# ProjectName SDK exists test

import pytest
from oldestpeoplerecords_sdk import OldestPeopleRecordsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OldestPeopleRecordsSDK.test(None, None)
        assert testsdk is not None
