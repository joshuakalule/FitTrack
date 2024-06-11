#!/usr/bin/python3
""" holds model Goal"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.orm import relationship


class Goal(BaseModel, Base):
    """Representation of a goal """

    __tablename__ = 'goals'
    title = Column(String(128), nullable=False)
    description = Column(String(512), nullable=False)
