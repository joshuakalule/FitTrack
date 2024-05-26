#!/usr/bin/python3
"""
Handles the class Workout

A workout is an exercise that a user does.
For example; Press ups, Pull ups, Yoga
"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Workout(BaseModel, Base):
    """Representation of a Workout"""

    __tablename__ = 'workouts'
    name = Column(String(128), nullable=False)
