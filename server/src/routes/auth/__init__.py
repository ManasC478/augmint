from flask import Blueprint
from .logout import bp as logout_bp
from .google import bp as google_bp

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
auth_bp.register_blueprint(logout_bp)
auth_bp.register_blueprint(google_bp)
