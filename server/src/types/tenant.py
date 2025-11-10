from typing import TypedDict, Optional, List
from datetime import datetime


class TenantSettings(TypedDict, total=False):
    callbackUrl: Optional[str]
    webhookSecret: Optional[str]
    allowedOrigins: List[str]


class Tenant(TypedDict):
    _id: str
    picture: str
    tenantName: str
    contactName: str
    email: str
    apiKeyHash: Optional[str]
    description: Optional[str]
    createdAt: datetime
    settings: TenantSettings
