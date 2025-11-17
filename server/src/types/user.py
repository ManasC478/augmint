from typing import TypedDict, List
from datetime import datetime


class User(TypedDict):
    _id: str
    picture: str
    name: str
    email: str
    createdAt: datetime
    garments: List[str]
    models: List[str]
