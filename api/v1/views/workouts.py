#!/usr/bin/python3
""" workouts module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.workout import Workout

@app_views.route('/workouts', strict_slashes=False, methods=['GET'])
def get_workouts():
    workouts = storage.all(Workout)
    workout_list = [workout.to_dict() for workout in workouts.values()]
    return jsonify(workout_list)


@app_views.route('/workouts/<workout_id>', methods=['GET'])
def get_workout(workout_id):
    workout = storage.get(Workout, workout_id)
    if workout is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(workout.to_dict())
