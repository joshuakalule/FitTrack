#!/usr/bin/python3
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
from api.v1.views.index import *
from api.v1.views.users import *
from api.v1.views.articles import *
from api.v1.views.goals import *
from api.v1.views.body_focus import *
from api.v1.views.programs import *
from api.v1.views.routines import *
from api.v1.views.workout_days import *
from api.v1.views.videos import *
from api.v1.views.workouts import *
from api.v1.views.reviews import *
