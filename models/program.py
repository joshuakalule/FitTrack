#!/usr/bin/python3
""" A module for the class Program"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship


class Program(BaseModel, Base):
    """Representation of a program """

    __tablename__ = 'program'
    name = Column(String(128), nullable=False)
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
