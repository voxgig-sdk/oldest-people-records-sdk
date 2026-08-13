# Typed models for the OldestPeopleRecords SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class OldestEverRequired(TypedDict):
    age: int
    birthDate: str
    country: str
    id: str
    name: str


class OldestEver(OldestEverRequired, total=False):
    deathDate: str
    lastUpdated: str
    verified: bool


class OldestEverLoadMatchRequired(TypedDict):
    id: str


class OldestEverLoadMatch(OldestEverLoadMatchRequired, total=False):
    age: int
    birthDate: str
    country: str
    deathDate: str
    lastUpdated: str
    name: str
    verified: bool


class OldestEverUpdateData(TypedDict, total=False):
    age: int
    birthDate: str
    country: str
    deathDate: str
    id: str
    lastUpdated: str
    name: str
    verified: bool


class OldestLivingRequired(TypedDict):
    age: int
    birthDate: str
    country: str
    id: str
    name: str


class OldestLiving(OldestLivingRequired, total=False):
    deathDate: str
    lastUpdated: str
    verified: bool


class OldestLivingLoadMatchRequired(TypedDict):
    id: str


class OldestLivingLoadMatch(OldestLivingLoadMatchRequired, total=False):
    age: int
    birthDate: str
    country: str
    deathDate: str
    lastUpdated: str
    name: str
    verified: bool


class OldestLivingUpdateData(TypedDict, total=False):
    age: int
    birthDate: str
    country: str
    deathDate: str
    id: str
    lastUpdated: str
    name: str
    verified: bool
