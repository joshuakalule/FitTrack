
#!/usr/bin/python3
""" A module for the class Review"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer

MAX_RATING = 5


class Review(BaseModel):
    """Representation of a review"""

    rating = Column(Integer, nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    content = Column(String(4096), nullable=False)

    def to_dict(self):
        """Overwrite to add new attributes."""
        data = super().to_dict()
        data['max_rating'] = MAX_RATING
        return data


class WorkoutReview(Review, Base):
    """Represenatation of a Workout review."""
    
    __tablename__ = 'workout_reviews'
    workout_id = Column(String(60), ForeignKey('workouts.id'), nullable=False)

class ProgramReview(Review, Base):
    """Represenatation of a Program review."""

    __tablename__ = 'program_reviews'
    program_id = Column(String(60), ForeignKey('programs.id'), nullable=False)
