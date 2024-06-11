#!/usr/bin/python3
""" body_focus module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.body_focus import BodyFocus

@app_views.route('/body_focus', strict_slashes=False, methods=['GET'])
def get_body_focuses():
    body_focus = storage.all(BodyFocus)
    body_focus_list = [body_focus.to_dict() for body_focus in body_focus.values()]
    return jsonify(body_focus_list)


@app_views.route('/body_focus/<body_focus_id>', methods=['GET'])
def get_body_focus(body_focus_id):
    body_focus = storage.get(BodyFocus, body_focus_id)
    if body_focus is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(body_focus.to_dict())
