#!/usr/bin/python3
""" A module for the class Program"""
from datetime import datetime
import models
from models.base_model import BaseModel, Base, time
import sqlalchemy
from sqlalchemy import (
    Column, String, ForeignKey, Table, CheckConstraint, Integer
)
from sqlalchemy.orm import relationship
from pprint import pprint
from models.review import MAX_RATING


"""Associative table for goals of a program."""
program_goals = Table(
    'program_goals',
    Base.metadata,
    Column('program_id', String(60),
           ForeignKey('programs.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
    Column('goal_id', String(60),
           ForeignKey('goals.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True)
)


class Program(BaseModel, Base):
    """Representation of a program """

    __tablename__ = 'programs'
    title = Column(String(128), nullable=False)
    description = Column(String(512), nullable=False)
    duration = Column(Integer, nullable=False) # in days
    difficulty = Column(String(16), nullable=False)
    body_focus_id = Column(String(60), ForeignKey('body_focus.id'), nullable=False)
    body_focus = relationship(
        "BodyFocus",
        backref="programs",
        # cascade="all, delete-orphan"
    )
    goals = relationship(
        "Goal", secondary="program_goals",
        backref="programs"
    )
    workouts = relationship(
        "Workout",
        backref="program",
        cascade="all, delete-orphan"
    )
    reviews = relationship(
        "ProgramReview",
        backref="program",
        cascade="all, delete-orphan"
    )


    def to_dict(self):
        """over write to_dict() to include relationships."""
        data = super().to_dict()
        data['goals'] = [goal.title for goal in self.goals]
        data['workouts'] = [workout.id for workout in self.workouts]
        ratings = [pr.rating for pr in self.reviews]
        data['rating'] = str(round(sum(ratings) / len(ratings), 1)) + '/' + str(MAX_RATING)
        data['reviewers'] = len(ratings) 
        return data
