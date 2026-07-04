# Typed models for the OldestPeopleRecords SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class OldestEver:
    age: int
    birth_date: str
    country: str
    id: str
    name: str
    death_date: Optional[str] = None
    last_updated: Optional[str] = None
    verified: Optional[bool] = None


@dataclass
class OldestEverLoadMatch:
    age: Optional[int] = None
    birth_date: Optional[str] = None
    country: Optional[str] = None
    death_date: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    name: Optional[str] = None
    verified: Optional[bool] = None


@dataclass
class OldestEverUpdateData:
    age: Optional[int] = None
    birth_date: Optional[str] = None
    country: Optional[str] = None
    death_date: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    name: Optional[str] = None
    verified: Optional[bool] = None


@dataclass
class OldestLiving:
    age: int
    birth_date: str
    country: str
    id: str
    name: str
    death_date: Optional[str] = None
    last_updated: Optional[str] = None
    verified: Optional[bool] = None


@dataclass
class OldestLivingLoadMatch:
    age: Optional[int] = None
    birth_date: Optional[str] = None
    country: Optional[str] = None
    death_date: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    name: Optional[str] = None
    verified: Optional[bool] = None


@dataclass
class OldestLivingUpdateData:
    age: Optional[int] = None
    birth_date: Optional[str] = None
    country: Optional[str] = None
    death_date: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    name: Optional[str] = None
    verified: Optional[bool] = None

