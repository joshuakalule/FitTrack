#!/usr/bin/python3
"""
initialize the models package
"""

from os import getenv, environ

CLASSES = {
    "User": User,
}


# set storage type
if getenv('HBNB_ENV') is not None:
    environ['HBNB_MYSQL_DB'] = 'hbnb_test_db'
