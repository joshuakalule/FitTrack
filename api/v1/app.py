#!/usr/bin/python3
""" Module for app.py """
from api.v1.views import app_views
from flask import Flask, jsonify
from models import storage
from os import getenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)

# TODO: add this to the .env file
app.config['JWT_SECRET_KEY'] = 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx'
jwt = JWTManager(app)

# cors = CORS(app, resources={r'/*': {"origins": "0.0.0.0"}})
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views)


@app.teardown_appcontext
def close_storage(exception):
    """ close storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 page """
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    host = getenv("HBNB_API_HOST", default="0.0.0.0")
    port = getenv("HBNB_API_PORT", default="5000")
    app.run(host=host, port=port, threaded=True, debug=True)
