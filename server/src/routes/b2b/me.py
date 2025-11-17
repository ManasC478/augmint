from flask import Blueprint, current_app, jsonify, g, request
from src.routes.auth.middleware import login_required
from .middleware import tenant_required
from src.types.tenant import Tenant
import hmac
import hashlib

bp = Blueprint("me", __name__, url_prefix="/me")


@bp.route("/", methods=["GET"])
@login_required
@tenant_required
def get_me():
    user: Tenant = g.tenant
    user["_id"] = str(user["_id"])
    return jsonify(user)


@bp.route("/account", methods=["PATCH"])
@login_required
@tenant_required
def update_account():
    user: Tenant = g.tenant
    account = request.json
    current_app.db.tenants.update_one({"_id": user["_id"]}, {"$set": account})
    return '', 204


@bp.route("/webhook", methods=["PATCH"])
@login_required
@tenant_required
def update_webhook():
    user: Tenant = g.tenant
    webhook = request.json
    current_app.db.tenants.update_one(
        {"_id": user["_id"]}, {"$set": {"settings.webhookSecret": webhook["webhookSecret"], "settings.callbackUrl": webhook["callbackUrl"]}})
    return '', 204


@bp.route("/cors-origins", methods=["PATCH"])
@login_required
@tenant_required
def update_security():
    user: Tenant = g.tenant
    security = request.json
    current_app.db.tenants.update_one(
        {"_id": user["_id"]}, {"$set": {"settings.allowedOrigins": security["allowedOrigins"]}})
    return '', 204


@bp.route("/api-key", methods=["PATCH"])
@login_required
@tenant_required
def update_api_key():
    user: Tenant = g.tenant
    apiKey = request.json["apiKey"]
    print(apiKey)
    apiKeyHash = hmac.new(current_app.config["HASH_SALT"].encode(
        "utf-8"), apiKey.encode("utf-8"), hashlib.sha256).hexdigest()
    current_app.db.tenants.update_one(
        {"_id": user["_id"]}, {"$set": {"apiKeyHash": apiKeyHash}})
    return '', 204
