# backend/app/services/overlay_service.py
from app.config.db import db
from bson.objectid import ObjectId

#this collection is like a 'table' in sql, it will store all overlays
overlays_collection = db['overlays']

def create_overlay(data):
    #this function saves a new overlay to the database
    result = overlays_collection.insert_one(data)
    #returning the ID of the newly created item so the frontend knows it was saved
    return str(result.inserted_id)

def get_all_overlays():
    #this function fetches alll overlays from the database
    overlays = []
    for doc in overlays_collection.find():
        #converting the strange ObjectId of MongoDB to a simple string
        doc['_id'] = str(doc['_id'])
        overlays.append(doc)
    return overlays
def update_overlay(id, data):
    #this function updates an existing overlay based on its ID
    #we using '$set' to tell MongoDB only to update the fields we sent
    overlays_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    return True

def delete_overlay(id):
    #this function removes an overlay from the database permanently
    overlays_collection.delete_one({'_id': ObjectId(id)})
    return True