from typing import TypedDict, Literal, Optional
from datetime import datetime

class Job(TypedDict):
    _id: str
    tenantId: str
    status: Literal["PENDING", "PROCESSING", "SUCCESS", "FAILED"]
    createdAt: datetime
    startedAt: Optional[datetime]
    completedAt: Optional[datetime]
    latencyMs: Optional[int]
    personImageKey: str
    garmentImageKey: str
    resultKey: Optional[str]
    fileSizeBytes: int
    error: Optional[str]


class JobMetrics(TypedDict):
    totalJobs: int
    successJobs: int
    failedJobs: int
    pendingJobs: int
    processingJobs: int
    avgLatencyS: float
    totalStorageMB: float
