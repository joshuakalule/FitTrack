#!/usr/bin/python3
"""
initialize the models package
"""

from os import getenv, environ
from models.user import User
from models.program import Program
from models.article import Article
from models.routine import Routine
from models.workout import Workout
from models.video import Video


CLASSES = {
    "User": User,
    "Program": Program,
    "Article": Article,
    "Routine": Routine,
    "Workout": Workout,
    "Video": Video,
}

# set storage type
if getenv('HBNB_ENV') is not None:
    environ['HBNB_MYSQL_DB'] = 'hbnb_test_db'
