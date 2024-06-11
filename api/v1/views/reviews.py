#!/usr/bin/python3
""" program_reviews module for the API """
from api.v1.views import app_views, implement_args
from flask import jsonify, request
from models import storage
from models.review import ProgramReview, WorkoutReview, MAX_RATING


@app_views.route('/program_reviews', strict_slashes=False, methods=['POST'])
def add_program_review():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400
    required = [
        "program_id", "user_id", "rating", "content"
    ]
    for attr in required:
        if attr not in data:
            return jsonify({"error": f"Missing {attr}"}), 400
    program_id = data['program_id']
    user_id = data['user_id']
    rating = int(data['rating'])
    content = data['content']

    from models.program import Program
    if not storage.get(Program, program_id):
        return jsonify({"error": "Unknown program"}), 404

    from models.user import User
    if not storage.get(User, user_id):
        return jsonify({"error": "Unknown user"}), 404

    if rating > MAX_RATING:
        return jsonify({"error": f"Rating exceeds MAX value ({MAX_RATING})"}), 404
    data = {
        'program_id': program_id,
        'user_id': user_id,
        'rating': rating,
        'content': content
    }
    obj = ProgramReview(**data)
    obj.save()
    return jsonify({"review_id": obj.id}), 201


@app_views.route('/program_reviews', strict_slashes=False, methods=['GET'])
def get_program_reviews():
    program_reviews = storage.all(ProgramReview)
    program_review_list = [program_review.to_dict() for program_review in program_reviews.values()]
    program_review_list = implement_args(program_review_list)
    return jsonify(program_review_list)


@app_views.route('/program_reviews/<program_review_id>', methods=['GET'])
def get_program_review(program_review_id):
    program_review = storage.get(ProgramReview, program_review_id)
    if program_review is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(program_review.to_dict())


@app_views.route('/program_reviews/<program_review_id>', methods=['DELETE'])
def delete_program_review(program_review_id):
    program_review = storage.get(ProgramReview, program_review_id)
    if program_review is None:
        return jsonify({"error": "Not found"}), 404
    storage.delete(program_review)
    storage.save()
    return jsonify({'status':'successful'}), 200


@app_views.route('/program_reviews/<program_review_id>', methods=['PUT'])
def update_program_review(program_review_id):
    program_review = storage.get(ProgramReview, program_review_id)
    if program_review is None:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Not a JSON"}), 400

    if 'rating' in data:
        if int(data['rating']) > MAX_RATING:
            return jsonify({"error": f"Rating exceeds MAX value ({MAX_RATING})"}), 404
        data['rating'] = int(data['rating'])
    else:
        return jsonify({"error": "missing rating"}), 404
    
    for key, value in data.items():
        if key not in [
            'id', 'program_id', 'user_id', 'created_at', 'updated_at']:
            setattr(program_review, key, value)
    program_review.save()
    return jsonify({'review_id':program_review.id}), 200
