from flask import Blueprint, current_app, g, request, jsonify
from .middleware import api_key_required, tenant_required
from src.types.tenant import Tenant
from bson import ObjectId
from datetime import datetime
from src.lib.aws.sqs import sqs_send_message

bp = Blueprint("try-on", __name__, url_prefix="/try-on")


@bp.route("/", methods=["POST"])
@api_key_required
@tenant_required
def try_on():
    try:
        user: Tenant = g.tenant
        body = request.json

        job_id = ObjectId()
        current_app.db.jobs.insert_one({
            "_id": job_id,
            "tenantId": user["_id"],
            "status": "PENDING",
            "createdAt": datetime.utcnow(),
            "startedAt": None,
            "completedAt": None,
            "latencyMs": None,
            "personImageKey": body["personImageKey"],
            "garmentImageKey": body["garmentImageKey"],
            "resultKey": None,
            "fileSizeBytes": None,
            "error": None
        })

        sqs_send_message(current_app.config["SQS_QUEUE_URL"], {
            "jobId": str(job_id),
            "personImageKey": body["personImageKey"],
            "garmentImageKey": body["garmentImageKey"],
        })
        return jsonify({"jobId": str(job_id)}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
