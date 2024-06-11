#!/usr/bin/python3
""" videos module for the API """
from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.video import Video

@app_views.route('/videos', strict_slashes=False, methods=['GET'])
def get_videos():
    videos = storage.all(Video)
    video_list = [video.to_dict() for video in videos.values()]
    return jsonify(video_list)


@app_views.route('/videos/<video_id>', methods=['GET'])
def get_video(video_id):
    video = storage.get(Video, video_id)
    if video is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(video.to_dict())
