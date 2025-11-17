from flask import Blueprint
from .me import bp as me_bp
from .jobs import bp as jobs_bp

b2c_bp = Blueprint('b2c', __name__, url_prefix='/b2c')
b2c_bp.register_blueprint(me_bp)
b2c_bp.register_blueprint(jobs_bp)
