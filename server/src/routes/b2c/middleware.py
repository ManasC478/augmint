from flask import jsonify, g
from functools import wraps


def user_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not hasattr(g, "user") or g.user is None:
            return jsonify({"error": "User access only"}), 403
        return f(*args, **kwargs)
    return wrapper
