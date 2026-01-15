from flask import Flask
from flask_cors import CORS
from app.config.db import verify_db_connection
import os
from dotenv import load_dotenv
def create_app():
    #loading environment variables
    load_dotenv()
    #initialize the flask application
    app = Flask(__name__)
    #enabling CORS (Cross-Origin Resource Sharing) cuz,
    #this allows our React Frontend (which is running on a different port) to talk to this backend.
    CORS(app)
    #verifying the db conn. on startup
    print("Checking Database Connection...")
    verify_db_connection()
    #importing and registering blueprints (routes)
    from app.routes.video_routes import video_bp
    from app.routes.main_routes import main_bp
    from app.routes.overlay_routes import overlay_bp
    #registering the video blueprint
    app.register_blueprint(video_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(overlay_bp)
    return app