#!/usr/bin/python3
from flask import Blueprint

def implement_args(return_list):
    """Implement args."""
    if not isinstance(return_list, list):
        print('[WARNING]: implement_args() received a non list object. Did nothing')
        return return_list
    sort_by = request.args.get('sort', 'updated_at')
    limit = request.args.get('limit', 'None')
    order = request.args.get('order', 'asc')
    
    # interpret
    if sort_by == 'newest':
        sort_by = 'updated_at'
        order = 'desc'
    elif sort_by == 'oldest':
        sort_by = 'updated_at'
        order = 'asc'
    output = return_list
    # sort and/or order
    try:
        if order not in ['asc', 'desc']:
            print(f"[WARNING]: unknown order '{order}', defaulted to 'asc'")
            order = 'asc'
        reverse = False if order == 'asc' else True
        output = sorted(return_list, key=lambda x: x[sort_by], reverse=reverse)
    except Exception:
        print(f"[WARNING]: error when sorting by '{sort_by}', did not sort")
    # limit
    if str(limit).isdigit() and len(output) > int(limit) and int(limit) > 0:
        end = int(limit)
        output = output[:end]
    else:
        print(f"[WARNING]: limit='{limit}' does not evaluate, no limit applied.")
    return output
    

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
