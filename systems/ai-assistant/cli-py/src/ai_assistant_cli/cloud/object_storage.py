import os
import boto3
from botocore.client import Config

_ACCOUNT_ID = os.environ.get("R2_ACCOUNT_ID")
_ACCESS_KEY_ID = os.environ.get("R2_ACCESS_KEY_ID")
_SECRET_ACCESS_KEY = os.environ.get("R2_SECRET_ACCESS_KEY")

# Configure the S3 client for Cloudflare R2
_s3_client = boto3.client(
    service_name="s3",
    endpoint_url=f"https://{_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=_ACCESS_KEY_ID,
    aws_secret_access_key=_SECRET_ACCESS_KEY,
    config=Config(signature_version="s3v4"),  # S3 compatibility
    region_name="auto",
)

_BUCKET_NAME = "job-hunting"


def persist_jd(role_id):
    _s3_client.upload_file(
        Bucket=_BUCKET_NAME, Key=f"{role_id}/jd.txt", Filename="assets/jd.txt"
    )


def extract_jd(role_id):
    response = _s3_client.get_object(Bucket=_BUCKET_NAME, Key=f"{role_id}/jd.txt")
    jd = response["Body"].read().decode("utf-8")
    return jd
