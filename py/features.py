# OldestPeopleRecords SDK feature factory

from feature.base_feature import OldestPeopleRecordsBaseFeature
from feature.test_feature import OldestPeopleRecordsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OldestPeopleRecordsBaseFeature(),
        "test": lambda: OldestPeopleRecordsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
