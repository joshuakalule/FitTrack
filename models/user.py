#!/usr/bin/python3
""" holds class User"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Float, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship


"""Associative table for goals of a user."""
user_goals = Table(
    'user_goals',
    Base.metadata,
    Column('user_id', String(60),
           ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
    Column('goal_id', String(60),
           ForeignKey('goals.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
)


"""Associative table for body_focus of a user."""
user_body_focus = Table(
    'user_body_focus',
    Base.metadata,
    Column('user_id', String(60),
           ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
    Column('body_focus_id', String(60),
           ForeignKey('body_focus.id', onupdate='CASCADE', ondelete='CASCADE'),
           primary_key=True),
)


class User(BaseModel, Base):
    """Representation of a user """

    __tablename__ = 'users'
    username = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    weight = Column(Float, default=0)
    height = Column(Float, default=0)
    age = Column(Integer, default=0)
    gender = Column(String(8), nullable=True)
    weight_goal = Column(Float, default=0)
    difficulty = Column(String(16), nullable=True)
    goals = relationship(
        "Goal", secondary="user_goals",
        backref="user",
        viewonly=True
    )
    routines = relationship(
        "Routine",
        backref="user",
        cascade="all, delete-orphan"
    )
    body_focuses = relationship(
        "BodyFocus", secondary="user_body_focus",
        backref="user",
        viewonly=True
    )

    def to_dict(self):
        """overwrite to_dict by adding relationships."""
        data = super().to_dict()
        data['routines'] = [routine.id for routine in self.routines]
        data['goals'] = [goal.title for goal in self.goals]
        data['body_parts'] = [bp.title for bp in self.body_focuses]
        if 'body_focuses' in data:
            del data['body_focuses']
        return data
