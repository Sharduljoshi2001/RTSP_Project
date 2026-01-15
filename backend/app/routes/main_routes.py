from flask import Blueprint
main_bp = Blueprint('main_bp', __name__)
@main_bp.route('/')
def index():
    return "<h1>RTSP Server is Running! 🚀</h1><p>Go to <a href='/video_feed'>/video_feed</a> to watch stream.</p>"