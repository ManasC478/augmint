from functools import wraps
from datetime import datetime
from flask import request, jsonify, current_app, g
from src.types.tenant import Tenant
from src.types.session import Session


def unauthorized():
    return jsonify({"error": "Not authenticated"}), 401


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        session_token = request.cookies.get("session")
        if not session_token:
            return unauthorized()

        session: Session | None = current_app.db.sessions.find_one(
            {"_id": session_token, "expiresAt": {"$gt": datetime.utcnow()}})
        if not session:
            return unauthorized()

        if session['authType'] == "tenant":
            tenant: Tenant = current_app.db.tenants.find_one(
                {"_id": session["userId"]})
            if not tenant:
                return unauthorized()
            g.tenant = tenant
            g.user = None
        else:
            # get user
            pass

        return f(*args, **kwargs)

    return wrapper


def tenant_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not hasattr(g, "tenant") or g.tenant is None:
            return jsonify({"error": "Tenant access only"}), 403
        return f(*args, **kwargs)
    return wrapper
