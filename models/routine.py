#!/usr/bin/python3
""" A module for the class Routine"""
from datetime import datetime, timedelta
import models
from models.base_model import BaseModel, Base, date
from models.workout_day import WorkoutDay
from models.program import Program
import sqlalchemy
from sqlalchemy import (
    Column, String, Date, ForeignKey
)
from sqlalchemy.orm import relationship


class Routine(BaseModel, Base):
    """Representation of a routine """

    __tablename__ = 'routines'
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    program_id = Column(String(60), ForeignKey('programs.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)

    workout_days = relationship(
        "WorkoutDay",
        backref="routine",
        cascade="all, delete-orphan"
    )

    def __init__(self, *args, **kwargs):
        """Overwrite to convert time."""
        super().__init__(*args, **kwargs)
        if kwargs.get("start_date", None):
            self.start_date = datetime.strptime(kwargs["start_date"], date).date()
        if kwargs.get("end_date", None):
            self.end_date = datetime.strptime(kwargs["end_date"], date).date()
        # get program
        program =  models.storage.get(Program, self.program_id)
        # set end date, -1 bcoz day one is one the start date
        program_duration = program.duration
        self.end_date = self.start_date + timedelta(days=program_duration-1)
        self.save()

    def calculate_completion(self):
        """Calculate completion rate of program."""
        program =  models.storage.get(Program, self.program_id)
        total = 0
        duration = program.duration
        for workout_day in self.workout_days:
            total += int(workout_day.completed_status)

        
        completion = (total / duration) * 100
        return round(completion, 1)

    def to_dict(self):
        """Overwrite to_dict to accomodate for relationships."""
        data = super().to_dict()
        data['workout_days'] = [wd.id for wd in self.workout_days]
        data['percent_completion'] = self.calculate_completion()
        # remove unwanted objs
        for attr in ['program', ]:
            if attr in data:
                del data[attr]
        return data
    
    def reload_object(self):
        """Reload object after changes are made."""
        program =  models.storage.get(Program, self.program_id)
        # 1. check if start_date changed
        if self.end_date - self.start_date == timedelta(days=program.duration-1):
            return
        # 1. set new end_date
        self.end_date = self.start_date + timedelta(days=program.duration-1)
        # 2. delete WorkoutDay objs
        for workout_day in self.workout_days:
            models.storage.delete(workout_day)
        # 3. set new workout days
        self.organize_days()

    def save(self):
        """Overwrite save method to reload before save."""
        self.reload_object()
        super().save()

    def organize_days(self):
        """create WorkoutDay objs from start_date to end_date."""
        program =  models.storage.get(Program, self.program_id)
        for workout in program.workouts:
            day_tally = workout.workout_day
            workout_date = self.start_date + timedelta(days=day_tally-1)

            workout_day_kwargs = {
                'date': workout_date,
                'workout_id': workout.id,
                'routine_id': self.id,
                'program_id': program.id
            }
            obj = WorkoutDay(**workout_day_kwargs)
            obj.save()
