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


class User(BaseModel, Base):
    """Representation of a user """

    __tablename__ = 'users'
    username = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    weight = Column(Float, default=0)
    age = Column(Integer, default=0)
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

    def to_dict(self):
        """overwrite to_dict by adding relationships."""
        data = super().to_dict()
        data['routines'] = [routine.id for routine in self.routines]
        data['goals'] = [goal.id for goal in self.goals]
        return data
