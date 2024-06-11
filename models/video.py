#!/usr/bin/python3
"""
Handles the class Video
"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship


class Video(BaseModel, Base):
    """Representation of a video"""

    __tablename__ = 'videos'
    title = Column(String(128), nullable=False)
    thumbnail_url = Column(String(128), nullable=False)
    thumbnail_width = Column(Integer, nullable=False)
    thumbnail_height = Column(Integer, nullable=False)
    youtube_video_id = Column(String(128), nullable=False)
    description = Column(String(6144), nullable=False)
    workout = relationship(
        "Workout", uselist=False,
        backref="video",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        """Overwrite to accomodate for relationships."""
        data = super().to_dict()
        data['workout_id'] = self.workout.id
        return data
