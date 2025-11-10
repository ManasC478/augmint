from flask import Blueprint
from .b2b import b2b_bp
from .auth import auth_bp

routes_bp = Blueprint('routes', __name__)
routes_bp.register_blueprint(b2b_bp)
routes_bp.register_blueprint(auth_bp)
