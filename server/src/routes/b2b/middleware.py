from flask import request, jsonify, current_app, g
from functools import wraps
import hmac
import hashlib


def api_key_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        api_key = request.headers.get("X-API-KEY")

        if not api_key:
            return jsonify({"error": "Missing API key"}), 401
        api_key_hash = hmac.new(current_app.config["HASH_SALT"].encode(
            "utf-8"), api_key.encode("utf-8"), hashlib.sha256).hexdigest()
        tenant = current_app.db.tenants.find_one({"apiKeyHash": api_key_hash})
        if not tenant:
            return jsonify({"error": "Invalid API key"}), 401

        g.tenant = tenant
        return f(*args, **kwargs)

    return wrapper


def tenant_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not hasattr(g, "tenant") or g.tenant is None:
            return jsonify({"error": "Tenant access only"}), 403
        return f(*args, **kwargs)
    return wrapper
