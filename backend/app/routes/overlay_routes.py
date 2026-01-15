from flask import Blueprint
from app.controllers.overlay_controller import add_overlay, get_overlays, update_overlay_data, delete_overlay_data
#creatng a blueprint (group of routes) for overlays
overlay_bp = Blueprint('overlay_bp', __name__)

#route to create a new overlay (POST request)
overlay_bp.route('/overlays', methods=['POST'])(add_overlay)

#route to get all overlays (GET request)
overlay_bp.route('/overlays', methods=['GET'])(get_overlays)

#route to update a specific overlay (PUT request)
#we need the <id> in the URL to know which one to update
overlay_bp.route('/overlays/<id>', methods=['PUT'])(update_overlay_data)

#route to delete a specific overlay (DELETE request)
overlay_bp.route('/overlays/<id>', methods=['DELETE'])(delete_overlay_data)