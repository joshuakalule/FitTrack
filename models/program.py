#!/usr/bin/python3
""" A module for the class Program"""
from datetime import datetime
import models
from models.base_model import BaseModel, Base, time
import sqlalchemy
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from pprint import pprint



class Program(BaseModel, Base):
    """Representation of a program """

    __tablename__ = 'programs'
    name = Column(String(128), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    workouts = relationship(
        "Workout",
        backref="program",
        cascade="all, delete-orphan"
    )

    routine = relationship(
        "Routine",
        backref="program",
        cascade="all, delete-orphan"
    )
