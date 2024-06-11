#!/usr/bin/python3
""" goals module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.goal import Goal


@app_views.route('/goals', strict_slashes=False, methods=['GET'])
def get_goals():
    goals = storage.all(Goal)
    goal_list = [goal.to_dict() for goal in goals.values()]
    return jsonify(goal_list)


@app_views.route('/goals/<goal_id>', methods=['GET'])
def get_goal(goal_id):
    goal = storage.get(Goal, goal_id)
    if goal is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(goal.to_dict())
