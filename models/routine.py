#!/usr/bin/python3
"""
Handles the class Routine

A routine is a period (time and period) within which a workout
is done.
"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, DateTime, ForeignKey


class Routine(BaseModel, Base):
    """Representation of a Routine """

    __tablename__ = 'routines'
    title = Column(String(128), nullable=False)
    description = Column(String(512), nullable=False)
    program_id = Column(String(60), ForeignKey('programs.id'), nullable=False)
    workout_id = Column(String(60), ForeignKey('workouts.id'), nullable=False)
    workout_time = Column(DateTime, nullable=False)
    workout_period = Column(DateTime, nullable=False)
