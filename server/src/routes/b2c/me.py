from flask import Blueprint, jsonify, g
from src.routes.auth.middleware import login_required
from .middleware import user_required
from src.types.user import User

bp = Blueprint("me", __name__, url_prefix="/me")


@bp.route("/", methods=["GET"])
@login_required
@user_required
def get_me():
    user: User = g.user
    user["_id"] = str(user["_id"])
    return jsonify(user)
