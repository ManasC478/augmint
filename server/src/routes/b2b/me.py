from flask import Blueprint, current_app, jsonify, g, request
from src.routes.auth.middleware import login_required, tenant_required
from src.types.tenant import Tenant
import bcrypt

bp = Blueprint("me", __name__, url_prefix="/me")


@bp.route("/", methods=["GET"])
@login_required
@tenant_required
def get_me():
    user: Tenant = g.tenant
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
    hashed = bcrypt.hashpw(apiKey.encode("utf-8"), bcrypt.gensalt())
    apiKeyHash = hashed.decode("utf-8")
    current_app.db.tenants.update_one(
        {"_id": user["_id"]}, {"$set": {"apiKeyHash": apiKeyHash}})
    return '', 204
