# OldestPeopleRecords SDK utility: make_context

from oldestpeoplerecords_sdk.core.context import OldestPeopleRecordsContext


def make_context_util(ctxmap, basectx):
    return OldestPeopleRecordsContext(ctxmap, basectx)
