#!/usr/bin/python3
""" holds class User"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """Representation of a user """

    __tablename__ = 'users'
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    weight = Column(Float, nullable=False)
    age = Column(Integer, nullable=False)
