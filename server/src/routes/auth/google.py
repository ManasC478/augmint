import google.oauth2.credentials
from bson import ObjectId
import secrets
from datetime import datetime, timedelta
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from flask import Blueprint, request, current_app, jsonify, redirect, session, url_for, make_response

bp = Blueprint("google", __name__, url_prefix="/google")


@bp.route("/login", methods=["GET"])
def google_login():
    auth_type = request.args.get("auth_type")
    flow = Flow.from_client_secrets_file(
        current_app.config["GOOGLE_CLIENT_SECRETS_FILE"],
        scopes=["openid", "email", "profile"],
    )
    flow.redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent',
        state="auth_type="+auth_type
    )
    print(authorization_url)
    resp = make_response(redirect(authorization_url))
    resp.set_cookie("oauth_state", state, httponly=True, secure=False)
    return resp


@bp.route("/callback", methods=["GET"])
def google_callback():
    returned_state = request.args.get("state")
    stored_state = request.cookies.get("oauth_state")
    if stored_state != returned_state:
        return "State mismatch", 400

    auth_type = None
    if returned_state:
        parts = returned_state.split("=")
        if len(parts) == 2:
            auth_type = parts[1]

    flow = Flow.from_client_secrets_file(
        current_app.config["GOOGLE_CLIENT_SECRETS_FILE"],
        scopes=["openid", "email", "profile"],
        state=stored_state
    )
    flow.redirect_uri = url_for(
        'routes.auth.google.google_callback', _external=True)

    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    request_session = grequests.Request()
    idinfo = id_token.verify_oauth2_token(
        credentials._id_token, request_session, flow.client_config['client_id']
    )

    email = idinfo["email"]
    name = idinfo.get("name")
    picture = idinfo.get("picture")

    user_id = ObjectId()
    if auth_type == "tenant":
        tenants = current_app.db.tenants
        existing_tenant = tenants.find_one({"_id": user_id})
        if not existing_tenant:
            tenants.insert_one({
                "_id": user_id,
                "picture": picture,
                "tenantName": name,
                "contactName": name,
                "email": email,
                "apiKeyHash": None,
                "description": None,
                "createdAt": datetime.now(),
                "settings": {
                    "callbackUrl": None,
                    "webhookSecret": None,
                    "allowedOrigins": []
                }
            })
    elif auth_type == "user":
        users = current_app.db.users
        existing_user = users.find_one({"_id": user_id})
        if not existing_user:
            users.insert_one({
                "_id": user_id,
                "picture": picture,
                "name": name,
                "email": email,
                "createdAt": datetime.now(),
                "garments": [],
                "models": [],
            })

    session_token = secrets.token_hex(32)
    expires_at = datetime.utcnow() + timedelta(days=7)
    current_app.db.sessions.insert_one({
        "_id": session_token,
        "userId": user_id,
        "authType": auth_type,
        "createdAt": datetime.utcnow(),
        "expiresAt": expires_at
    })

    resp = make_response(
        redirect(f"{current_app.config['CLIENT_URL']}/dashboard"))
    resp.set_cookie(
        "session",
        session_token,
        httponly=True,
        secure=current_app.config["COOKIE_SECURE"],
        samesite=current_app.config["COOKIE_SAMESITE"],
        expires=expires_at
    )
    resp.set_cookie(
        "auth_type",
        auth_type,
        httponly=True,
        secure=current_app.config["COOKIE_SECURE"],
        samesite=current_app.config["COOKIE_SAMESITE"],
        expires=expires_at
    )

    csrf_token = secrets.token_hex(32)
    resp.set_cookie(
        "csrfToken",
        csrf_token,
        httponly=False,
        secure=current_app.config["COOKIE_SECURE"],
        samesite=current_app.config["COOKIE_SAMESITE"],
        expires=expires_at
    )

    return resp
