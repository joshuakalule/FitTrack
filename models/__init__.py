#!/usr/bin/python3
"""
initialize the models package
"""

from os import getenv, environ
from pathlib import Path
from models.user import User
from models.program import Program
from models.routine import Routine
from models.workout_day import WorkoutDay
from models.article import Article
from models.goal import Goal
from models.body_focus import BodyFocus
from models.workout import Workout
from models.video import Video
from models.review import ProgramReview, WorkoutReview
from dotenv import load_dotenv

# load ENV variables from the .env file
if not Path('.env').exists():
    raise FileNotFoundError(".env file missing in the root directory.")
load_dotenv()


CLASSES = {
    "User": User,
    "Program": Program,
    "Routine": Routine,
    "Article": Article,
    "Workout": Workout,
    "WorkoutDay": WorkoutDay,
    "ProgramReview": ProgramReview,
    "WorkoutReview": WorkoutReview,
    "BodyFocus": BodyFocus,
    "Goal": Goal,
    "Video": Video
}

# set storage type
if getenv('FITTRACK_ENV') == 'test':
    environ['FITTRACK_MYSQL_DB'] = getenv("FITTRACK_TEST_DB")

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
