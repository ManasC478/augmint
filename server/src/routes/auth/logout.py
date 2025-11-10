from flask import Blueprint, request, current_app, jsonify
from src.routes.auth.middleware import login_required

bp = Blueprint("logout", __name__, url_prefix="/logout")


@bp.route("/", methods=["POST"])
@login_required
def logout():
    session_token = request.cookies.get("session")
    if session_token:
        current_app.db.sessions.delete_one({"_id": session_token})

    resp = jsonify({"success": True})
    resp.set_cookie("session", "", expires=0)
    resp.set_cookie("csrfToken", "", expires=0)
    return resp
