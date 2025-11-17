from functools import wraps
from datetime import datetime
from flask import request, jsonify, current_app, g
from src.types.tenant import Tenant
from src.types.user import User
from src.types.session import Session


def unauthorized():
    return jsonify({"error": "Not authenticated"}), 401


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        session_token = request.cookies.get("session")
        auth_type = request.cookies.get("auth_type")
        if not session_token or not auth_type:
            return unauthorized()

        session: Session | None = current_app.db.sessions.find_one(
            {
                "_id": session_token,
                "authType": auth_type,
                "expiresAt": {"$gt": datetime.utcnow()}
            }
        )
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
            user: User = current_app.db.users.find_one(
                {"_id": session["userId"]})
            if not user:
                return unauthorized()
            g.user = user
            g.tenant = None

        return f(*args, **kwargs)

    return wrapper
