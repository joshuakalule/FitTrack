#!/usr/bin/python3
""" A module for the class Article"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String


class Article(BaseModel, Base):
    """Representation of a article"""

    __tablename__ = 'articles'
    title = Column(String(128), nullable=True)
    author = Column(String(128), nullable=False)
    content = Column(String(4096), nullable=False)
