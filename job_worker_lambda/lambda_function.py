import os
import time
import requests
import json
from datetime import datetime
from pymongo import MongoClient
import logging
import boto3
from bson import ObjectId

MONGO_URI = os.environ["MONGO_URI"]
DB_NAME = os.environ.get("DB_NAME", "augmint")
SQS_QUEUE_URL = os.environ.get("SQS_QUEUE_URL")
S3_BUCKET = os.environ.get("S3_BUCKET")
S3_BUCKET_URL = os.environ.get("S3_BUCKET_URL")
FASHN_API_URL = os.environ.get("FASHN_API_URL")
FASHN_API_KEY = os.environ.get("FASHN_API_KEY")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
logger = logging.getLogger()
logger.setLevel(logging.INFO)
sqs = boto3.client("sqs", region_name="us-west-2")
s3 = boto3.client("s3", region_name="us-west-2")


def delete_message_from_queue(receipt_handle):
    if SQS_QUEUE_URL:
        sqs.delete_message(
            QueueUrl=SQS_QUEUE_URL,
            ReceiptHandle=receipt_handle
        )
        logger.info("Message deleted from queue after successful processing")


def generate_tryon(model_url, garment_url):
    response = requests.post(
        f"{FASHN_API_URL}/v1/run",
        headers={
            "Authorization": f"Bearer {FASHN_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model_name": "tryon-v1.6",
            "inputs": {
                "model_image": model_url,
                "garment_image":  garment_url
            }
        }
    ).json()

    logger.info(f"Fashn try on response: {response}")

    if response["error"]:
        raise Exception(
            f"{response['error']['name']}: {response['error']['message']}")
    return response["id"]


def wait_for_completion(id):
    while True:
        response = requests.get(
            f"{FASHN_API_URL}/v1/status/{id}",
            headers={
                "Authorization": f"Bearer {FASHN_API_KEY}",
                "Content-Type": "application/json"
            }
        ).json()

        logger.info(f"Fashn try on status: {response}")
        if response['status'] == "completed":
            if len(response['output']) > 0:
                return response["output"][0]
            else:
                raise Exception("Uknown error: No generated output")
        elif response['status'] == "failed":
            logger.error(
                f"Fashn job failed: {response['error']['name']}: {response['error']['message']}")
            raise Exception(
                f"{response['error']['name']}: {response['error']['message']}")

        time.sleep(5)


def download_and_upload(url, key):
    try:
        resp = requests.get(url, stream=True)
        resp.raise_for_status()
    except Exception as e:
        logger.error(e)
        return None

    size_bytes = int(resp.headers.get("Content-Length", 0))
    logger.info(f"File size: {size_bytes}")

    try:
        s3.upload_fileobj(
            resp.raw, S3_BUCKET, key)
        logger.info(f"Uploaded {key}")
        return size_bytes
    except Exception as e:
        logger.error(e)
        return None


def lambda_handler(event, context):
    for record in event["Records"]:
        body = json.loads(record["body"])
        logger.info(f"Processing message: {body}")
        job_id = body.get("jobId", None)
        model_url = body.get("personImageKey", None)
        garment_url = body.get("garmentImageKey", None)
        startedAt = datetime.utcnow()

        try:
            if not job_id or not model_url or not garment_url:
                raise ValueError(
                    f"ERROR: Missing jobId or model/garment in message: {body}")

            logger.info(f"Updating job {job_id} to PROCESSING...")

            result = db.jobs.update_one(
                {"_id": ObjectId(job_id)},
                {
                    "$set": {
                        "status": "PROCESSING",
                        "startedAt": startedAt,
                    }
                }
            )

            logger.info(f"MongoDB result: {result}")
            if result.modified_count == 0:
                raise Exception(f"ERROR: Job {job_id} not found in MongoDB.")

            logger.info(f"SUCCESS: Job {job_id} updated to PROCESSING.")
        except Exception as e:
            logger.error(
                f"ERROR: Failed to generate job {job_id}: {e}")
            continue

        fashn_job_id = None
        try:
            fashn_job_id = generate_tryon(model_url, garment_url)
            logger.info(f"Fashn job id: {fashn_job_id}")
        except Exception as e:
            logger.error(
                f"ERROR: Failed to initiate Fashn job {job_id}: {e}")
            db.jobs.update_one(
                {"_id": ObjectId(job_id)},
                {
                    "$set": {
                        "status": "PENDING",
                        "startedAt": None,
                    }
                }
            )
            continue

        generated_url = None
        try:
            generated_url = wait_for_completion(fashn_job_id)
            logger.info(f"Fashn generated url: {generated_url}")
        except Exception as e:
            logger.error(
                f"ERROR: Failed to generate tryon {job_id}: {e}")
            completedAt = datetime.utcnow()
            db.jobs.update_one(
                {"_id": ObjectId(job_id)},
                {
                    "$set": {
                        "status": "FAILED",
                        "completedAt": completedAt,
                        "error": str(e),
                        "latencyMs": (completedAt - startedAt).total_seconds() * 1000
                    }
                }
            )
            delete_message_from_queue(record["receiptHandle"])
            continue

        resultKey = f"jobs/{job_id}/result.png"
        result_size = download_and_upload(generated_url, resultKey)
        completedAt = datetime.utcnow()
        db.jobs.update_one(
            {"_id": ObjectId(job_id)},
            {
                "$set": {
                    "status": "SUCCESS",
                    "completedAt": completedAt,
                    "resultKey": f"{S3_BUCKET_URL}/{resultKey}",
                    "fileSizeBytes": result_size,
                    "latencyMs": (completedAt - startedAt).total_seconds() * 1000
                }
            }
        )
        logger.info(f"SUCCESS: Job {job_id} updated to SUCCESS.")
        delete_message_from_queue(record["receiptHandle"])

    return {"statusCode": 200, "body": "OK"}
