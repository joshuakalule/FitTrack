#!/usr/bin/python3
""" routines module for the API """
from api.v1.views import app_views, implement_args
from flask import jsonify, request
from models import storage
from models.routine import Routine
from models.goal import Goal
from models.program import Program
from models.base_model import date
from models.user import User
from datetime import datetime
from pprint import pprint


@app_views.route('/get-routine/<routine_id>', strict_slashes=False, methods=['GET'])
def get_routine_data(routine_id):
    status, routine_data = storage.get_routine(routine_id)
    if not status:
        return jsonify({"error": "Error fetching data"}), 500
    print(routine_data)
    return jsonify(routine_data), 200

@app_views.route('/routines/<routine_id>/completion', strict_slashes=False, methods=['GET'])
def get_completion(routine_id):
    routine = storage.get(Routine, routine_id)
    if routine is None:
        return jsonify({"error": "Not found"}), 404
    completion = routine.to_dict().get('percent_completion', None)
    if completion is None:
        return jsonify({"error": "Failed to calculate completion"}), 500
    return jsonify({"completion":completion, "out_of": 100}), 200


@app_views.route('/routines', strict_slashes=False, methods=['GET'])
def get_routines():
    routines = storage.all(Routine)
    routine_list = [routine.to_dict() for routine in routines.values()]
    routine_list = implement_args(routine_list)
    return jsonify(routine_list)


@app_views.route('/routines/<routine_id>', methods=['GET'])
def get_routine(routine_id):
    routine = storage.get(Routine, routine_id)
    if routine is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(routine.to_dict())


@app_views.route('/routines/<routine_id>', methods=['PUT'])
def update_routine(routine_id):
    routine = storage.get(Routine, routine_id)
    if routine is None:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    
    if 'start_date' not in data:
        return jsonify({"error": "Start date missing"}), 400
    try:
        start_date = datetime.strptime(data['start_date'], date).date()
    except Exception as e:
        return jsonify({
            "error": f"start date does not confrom to '{date}'"}), 500

    if start_date == routine.start_date:
        return jsonify({"routine_id": routine.id}), 304

    if start_date < datetime.now().date():
        return jsonify({"error": "Start date cannot be in the past"}), 400

    setattr(routine, 'start_date', start_date)
    
    routine.save()
    return jsonify({"routine_id": routine.id}), 200


@app_views.route('/routines/<routine_id>', methods=['DELETE'])
def delete_routine(routine_id):
    routine = storage.get(Routine, routine_id)
    if not routine:
        return jsonify({"error": "Not found"}), 404
    storage.delete(routine)
    storage.save()
    return jsonify({'status': 'successful'}), 200


@app_views.route('/add_program/<user_id>', methods=['POST'])
def add_program(user_id):
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    required = [
        "program_id", "start_date"
    ]
    for attr in required:
        if attr not in data:
            return jsonify({"error": f"Missing {attr}"}), 400
    
    program_id = data['program_id']
    start_str = data['start_date']

    user = storage.get(User, user_id)
    if not user:
        return jsonify({"error": f"Unknown user"}), 400
    
    program = storage.get(Program, program_id)
    if not program:
        return jsonify({"error": f"Unknown program"}), 400

    data['user_id'] = user_id 
    
    # ensure that there is no 'end_date'
    if 'end_date' in data:
        del data['end_date']

    routine = Routine(**data)
    # create WorkoutDay objs
    routine.organize_days()
    routine.save()

    return jsonify({"routine_id": routine.id}), 200
