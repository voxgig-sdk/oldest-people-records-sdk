# OldestPeopleRecords SDK feature factory

from oldestpeoplerecords_sdk.feature.base_feature import OldestPeopleRecordsBaseFeature
from oldestpeoplerecords_sdk.feature.test_feature import OldestPeopleRecordsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OldestPeopleRecordsBaseFeature(),
        "test": lambda: OldestPeopleRecordsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
