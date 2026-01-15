from flask import request, jsonify
from app.services.overlay_service import create_overlay, get_all_overlays, update_overlay, delete_overlay
from app.models.overlay_model import OverlayModel

def add_overlay():
    try:
        #getting the data sent by the user(frontend)
        data = request.json
        #creating a structured object using our Model
        new_overlay = OverlayModel.structure(
            content=data['content'],
            type=data['type'],
            x=data.get('x', 50),       #default X position is 50
            y=data.get('y', 50),       #default Y position is 50
            width=data.get('width', 100),
            height=data.get('height', 50)
        )
        #calling the service to save it in MongoDB
        overlay_id = create_overlay(new_overlay)
        
        return jsonify({"message": "Overlay created successfully", "id": overlay_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_overlays():
    try:
        #calling the service to get all data
        data = get_all_overlays()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_overlay_data(id):
    try:
        #getting the new data to update
        data = request.json
        #calling service to update
        update_overlay(id, data)
        return jsonify({"message": "Overlay updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_overlay_data(id):
    try:
        #calling service to delete
        delete_overlay(id)
        return jsonify({"message": "Overlay deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500