#!/usr/bin/python3
""" workout_days module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.workout_day import WorkoutDay
from datetime import datetime


@app_views.route('/workout_days/<workout_day_id>', methods=['PUT'])
def update_workout_day(workout_day_id):
    workout_day = storage.get(WorkoutDay, workout_day_id)
    if workout_day is None:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    if 'completed_status' in data:
        if int(data['completed_status']) not in [1, 0]:
            return jsonify({"error": "Invalid value for completed_status (1 or 0)"}), 400
        # can only set status to complete if date is today or past
        date = workout_day.date
        today = datetime.now().date()
        if date > today:
            return jsonify({"error":"date for workout in future!"}), 403
        data['completed_status'] = int(data['completed_status'])

    for key, value in data.items():
        if key not in [
            'id', 'program_id', 'routine_id', 'workout_id', 'date', 'created_at',
            'updated_at']:
            setattr(workout_day, key, value)
        workout_day.save()
        return jsonify({"workout_day_id": workout_day.id}), 200


@app_views.route('/workout_days', strict_slashes=False, methods=['GET'])
def get_workout_days():
    workout_days = storage.all(WorkoutDay)
    workout_day_list = [workout_day.to_dict() for workout_day in workout_days.values()]
    return jsonify(workout_day_list)


@app_views.route('/workout_days/<workout_day_id>', methods=['GET'])
def get_workout_day(workout_day_id):
    workout_day = storage.get(WorkoutDay, workout_day_id)
    if workout_day is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(workout_day.to_dict())
