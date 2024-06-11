
#!/usr/bin/python3
""" holds model WorkoutDay"""
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship


class WorkoutDay(BaseModel, Base):
    """Representation of a workout_day """

    __tablename__ = 'workout_days'
    program_id = Column(String(60), ForeignKey('programs.id'), nullable=False)
    routine_id = Column(String(60), ForeignKey('routines.id'), nullable=False)
    workout_id = Column(String(60), ForeignKey('workouts.id'), nullable=False)
    completed_status = Column(Boolean, default=False)
    date = Column(Date, nullable=False)
