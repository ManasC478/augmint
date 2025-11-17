from flask import Blueprint, current_app, jsonify
from typing import List
from src.types.job import Job, JobMetrics
from src.routes.auth.middleware import login_required
from .middleware import user_required
from src.types.user import User
from flask import g

bp = Blueprint("jobs", __name__, url_prefix="/jobs")


@bp.route("/", methods=["GET"])
@login_required
@user_required
def get_jobs():
    user: User = g.user
    jobs: List[Job] = list(
        current_app.db.jobs.find({"tenantId": user['_id']}))
    for job in jobs:
        job["_id"] = str(job["_id"])
        job["tenantId"] = str(job["tenantId"])
    return jsonify(jobs)


@bp.route("/metrics", methods=["GET"])
@login_required
@user_required
def get_jobs_metrics():
    user: User = g.user
    cursor = current_app.db.jobs.aggregate([
        {"$match": {"tenantId": user['_id']}},
        {
            "$facet": {
                "metrics": [{
                    "$group": {
                        "_id": None,
                        "totalJobs": {"$sum": 1},
                        "successJobs": {"$sum": {"$cond": [{"$eq": ["$status", "SUCCESS"]}, 1, 0]}},
                        "failedJobs": {"$sum": {"$cond": [{"$eq": ["$status", "FAILED"]}, 1, 0]}},
                        "processingJobs": {"$sum": {"$cond": [{"$eq": ["$status", "PROCESSING"]}, 1, 0]}},
                        "pendingJobs": {"$sum": {"$cond": [{"$eq": ["$status", "PENDING"]}, 1, 0]}},
                        "avgLatencyMs": {"$avg": "$latencyMs"},
                        "totalStorageBytes": {"$sum": "$fileSizeBytes"}
                    }
                }]
            }
        },
        {
            "$project": {
                "totalJobs": {"$ifNull": [{"$arrayElemAt": ["$metrics.totalJobs", 0]}, 0]},
                "successJobs": {"$ifNull": [{"$arrayElemAt": ["$metrics.successJobs", 0]}, 0]},
                "failedJobs": {"$ifNull": [{"$arrayElemAt": ["$metrics.failedJobs", 0]}, 0]},
                "pendingJobs": {"$ifNull": [{"$arrayElemAt": ["$metrics.pendingJobs", 0]}, 0]},
                "processingJobs": {"$ifNull": [{"$arrayElemAt": ["$metrics.processingJobs", 0]}, 0]},
                "avgLatencyS": {
                    "$round": [
                        {"$divide": [{"$ifNull": [
                            {"$arrayElemAt": ["$metrics.avgLatencyMs", 0]}, 0]}, 1000]},
                        2
                    ]
                },
                "totalStorageMB": {
                    "$round": [
                        {"$divide": [{"$ifNull": [
                            {"$arrayElemAt": ["$metrics.totalStorageBytes", 0]}, 0]}, 1024 * 1024]},
                        1
                    ]
                }
            }
        }
    ])
    results = list(cursor)
    metrics: JobMetrics = results[0]
    return jsonify(metrics)
