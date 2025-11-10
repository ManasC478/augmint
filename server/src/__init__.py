from flask import Flask
from .database import connect_to_database
from .config import Config
from .routes import routes_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    CORS(app,
         origins=["http://localhost:5173"],  # Specify exact origin
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])

    connect_to_database(app)

    app.register_blueprint(routes_bp)

    return app
