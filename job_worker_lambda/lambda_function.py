import os
import json
from datetime import datetime
from pymongo import MongoClient
import logging
import boto3
from bson import ObjectId

MONGO_URI = os.environ["MONGO_URI"]
DB_NAME = os.environ.get("DB_NAME", "augmint")
SQS_QUEUE_URL = os.environ.get("SQS_QUEUE_URL")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
logger = logging.getLogger()
logger.setLevel(logging.INFO)
sqs = boto3.client("sqs", region_name="us-west-2")


def delete_message_from_queue(receipt_handle):
    if SQS_QUEUE_URL:
        sqs.delete_message(
            QueueUrl=SQS_QUEUE_URL,
            ReceiptHandle=receipt_handle
        )
        logger.info("Message deleted from queue after successful processing")


def lambda_handler(event, context):
    for record in event["Records"]:
        body = json.loads(record["body"])
        job_id = body.get("jobId")

        try:
            if not job_id:
                raise ValueError(f"ERROR: Missing jobId in message: {body}")

            logger.info(f"Updating job {job_id} to PROCESSING...")

            result = db.jobs.update_one(
                {"_id": ObjectId(job_id)},
                {
                    "$set": {
                        "status": "PROCESSING",
                        "startedAt": datetime.utcnow(),
                    }
                }
            )

            logger.info(f"MongoDB result: {result}")
            if result.modified_count == 0:
                raise Exception(f"ERROR: Job {job_id} not found in MongoDB.")

            logger.info(f"SUCCESS: Job {job_id} updated to PROCESSING.")

            delete_message_from_queue(record["receiptHandle"])
        except Exception as e:
            db.jobs.update_one(
                {"_id": ObjectId(job_id)},
                {
                    "$set": {
                        "status": "PENDING",
                        "startedAt": None,
                    }
                }
            )
            logger.error(
                f"ERROR: Failed to generate job {job_id}: {e}")
            continue

    return {"statusCode": 200, "body": "OK"}
