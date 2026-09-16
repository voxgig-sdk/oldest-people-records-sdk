# OldestPeopleRecords SDK feature factory

from oldestpeoplerecords_sdk.feature.base_feature import OldestPeopleRecordsBaseFeature
from oldestpeoplerecords_sdk.feature.ratelimit_feature import OldestPeopleRecordsRatelimitFeature
from oldestpeoplerecords_sdk.feature.retry_feature import OldestPeopleRecordsRetryFeature
from oldestpeoplerecords_sdk.feature.test_feature import OldestPeopleRecordsTestFeature
from oldestpeoplerecords_sdk.feature.timeout_feature import OldestPeopleRecordsTimeoutFeature


_FEATURES = {
    "base": lambda: OldestPeopleRecordsBaseFeature(),
    "ratelimit": lambda: OldestPeopleRecordsRatelimitFeature(),
    "retry": lambda: OldestPeopleRecordsRetryFeature(),
    "test": lambda: OldestPeopleRecordsTestFeature(),
    "timeout": lambda: OldestPeopleRecordsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
