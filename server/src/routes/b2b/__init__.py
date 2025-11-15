from flask import Blueprint
from .jobs import bp as jobs_bp
from .me import bp as me_bp
from .tryon import bp as try_on_bp

b2b_bp = Blueprint('b2b', __name__, url_prefix='/b2b')
b2b_bp.register_blueprint(jobs_bp)
b2b_bp.register_blueprint(me_bp)
b2b_bp.register_blueprint(try_on_bp)
