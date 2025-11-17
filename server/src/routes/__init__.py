from flask import Blueprint
from .b2b import b2b_bp
from .auth import auth_bp
from .b2c import b2c_bp

routes_bp = Blueprint('routes', __name__)
routes_bp.register_blueprint(b2b_bp)
routes_bp.register_blueprint(auth_bp)
routes_bp.register_blueprint(b2c_bp)
