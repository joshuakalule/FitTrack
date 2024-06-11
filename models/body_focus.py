#!/usr/bin/python3
""" holds model Body Focus"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class BodyFocus(BaseModel, Base):
    """Representation of a body_focus """

    __tablename__ = 'body_focus'
    title = Column(String(128), nullable=False)
