import boto3
import json
import os

sqs = boto3.client(
    "sqs",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name="us-west-2"
)

queue_url = os.getenv("SQS_QUEUE_URL")


def sqs_send_message(queue_url, message):
    sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=json.dumps(message)
    )
