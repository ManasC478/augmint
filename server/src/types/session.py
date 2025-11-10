from typing import TypedDict, Literal
from datetime import datetime

class Session(TypedDict):
    _id: str
    userId: str
    authType: Literal["tenant", "user"]
    createdAt: datetime
    expiresAt: datetime
