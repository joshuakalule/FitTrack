#!/usr/bin/python3
"""
initialize the models package
"""

from os import getenv, environ
from pathlib import Path
from models.user import User
from models.program import Program
from models.article import Article
from models.routine import Routine
from models.workout import Workout
from models.video import Video
from dotenv import load_dotenv

# load ENV variables from the .env file
if not Path('.env').exists():
    raise FileNotFoundError(".env file missing in the root directory.")
load_dotenv()


CLASSES = {
    "User": User,
    "Program": Program,
    "Article": Article,
    "Routine": Routine,
    "Workout": Workout,
    "Video": Video,
}

# set storage type
if getenv('FITTRACK_ENV') is not None:
    environ['FITTRACK_MYSQL_DB'] = getenv("FITTRACK_TEST_DB")

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
