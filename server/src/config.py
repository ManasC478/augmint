import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS").split(",")
    DEBUG = True
    PORT = os.getenv("PORT")
    GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
    GOOGLE_CLIENT_SECRETS_FILE = os.getenv("GOOGLE_CLIENT_SECRETS_FILE")
    CLIENT_URL = os.getenv("CLIENT_URL")
    COOKIE_SECURE = bool(int(os.getenv("COOKIE_SECURE")))
    COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE")
    OAUTHLIB_INSECURE_TRANSPORT = os.getenv("OAUTHLIB_INSECURE_TRANSPORT")
    OAUTHLIB_RELAX_TOKEN_SCOPE = os.getenv("OAUTHLIB_RELAX_TOKEN_SCOPE")
    HASH_SALT = os.getenv("HASH_SALT")
    SQS_QUEUE_URL = os.getenv("SQS_QUEUE_URL")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
