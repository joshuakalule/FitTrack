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
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship


"""Associative table for likes for a workout."""
workout_likes = Table(
    'workout_like',
    Base.metadata,
    Column('workout_id', String(60),
           ForeignKey('workouts.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
    Column('user_id', String(60),
           ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True)
)


class Workout(BaseModel, Base):
    """Representation of a Workout"""

    __tablename__ = 'workouts'
    title = Column(String(128), nullable=False)
    program_id = Column(String(60), ForeignKey('programs.id'), nullable=True)
    video_id = Column(String(60), ForeignKey('videos.id'), nullable=False)
    workout_day = Column(Integer, nullable=True)
    likes = relationship(
        "User", secondary="workout_like",
        backref="workout_likes",
        viewonly=False
    )

    def to_dict(self):
        """Overwrite to accomodate for relationships."""
        data = super().to_dict()
        data['likes'] = len(self.likes)
        return data
