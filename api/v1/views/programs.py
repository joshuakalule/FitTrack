#!/usr/bin/python3
""" programs module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.program import Program, program_goals
from models.goal import Goal


@app_views.route('/programs', strict_slashes=False, methods=['GET'])
def get_programs():
    programs = storage.all(Program)
    program_list = [program.to_dict() for program in programs.values()]
    return jsonify(program_list)


@app_views.route('/programs/<program_id>', methods=['GET'])
def get_program(program_id):
    program = storage.get(Program, program_id)
    if program is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(program.to_dict())



