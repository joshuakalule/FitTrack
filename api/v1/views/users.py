#!/usr/bin/python3
""" users module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.user import User

from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity )
from werkzeug.security import generate_password_hash, check_password_hash

# TODO: add this to the .env file
app.config['JWT_SECRET_KEY'] = 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx'
jwt = JWTManager(app)


@app_views.route('/users', strict_slashes=False, methods=['GET'])
def get_users():
    users = storage.all(User)
    user_list = [user.to_dict() for user in users.values()]
    return jsonify(user_list)


@app_views.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = storage.get(User, user_id)
    if user is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(user.to_dict())


@app_views.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = storage.get(User, user_id)
    if user is None:
        return jsonify({"error": "Not found"}), 404
    storage.delete(user)
    storage.save()
    return jsonify({}), 200


@app_views.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    if 'email' not in data:
        return jsonify({"error": "Missing email"}), 400
    if 'password' not in data:
        return jsonify({"error": "Missing password"}), 400
    # store the password hash and not the actual password
    hashed_password = generate_password_hash(data['password'])
    data['password'] = hashed_password
    user = User(**data)
    user.save()
    return jsonify(user.to_dict()), 201


@app_views.route('/users/login', strict_slashes=False, methods=['GET'])
def login_user():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    if 'email' not in data:
        return jsonify({"error": "Missing email"}), 400
    if 'password' not in data:
        return jsonify({"error": "Missing password"}), 400
    users = storage.all(User)
    email = data.get(email)
    user_id = None
    password = data.get(password)
    for user_key, user_obj in users:
        if user_obj.email == email:
            if check_password_hash(user_obj.password, password):
                user_id = user_obj.id
                break
    if user_id is None:
        return jsonify({'Error': 'Authentication failed'}), 401
    access_token = create_access_token(identity=email)

    return jsonify({'access_token': access_token}), 200


@app_views.route('/protected', strict_slashes=False, methods=['GET'])
def protected():
    current_user = get_jwt_identity()
    return jsonify({'logged_in_as': 'current_user'), 200


@app_views.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = storage.get(User, user_id)
    if user is None:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    for key, value in data.items():
        if key not in ['id', 'email', 'created_at', 'updated_at']:
            setattr(user, key, value)
    user.save()
    return jsonify(user.to_dict()), 200
