from flask import Blueprint
from app.controllers.video_controller import video_feed
#creating a Blueprint (a group of routes) for video related URLs
video_bp = Blueprint('video_bp', __name__)
#defining the route rul below
#when the user visits 'http://localhost:5000/video_feed', the video_feed function will run.
video_bp.route('/video_feed')(video_feed)