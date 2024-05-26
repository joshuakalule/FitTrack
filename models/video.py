#!/usr/bin/python3
""" A module for the class video"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String


class Video(BaseModel, Base):
    """Representation of a video"""

    __tablename__ = 'video'
    name = Column(String(128), nullable=False)
    link = Column(String(256), nullable=False)
    thumbnail_path = Column(String(128), nullable=False)
    description = Column(String(256), nullable=False)
