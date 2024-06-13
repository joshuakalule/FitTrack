#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.base_model import BaseModel, Base
from models.user import User
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from dotenv import load_dotenv
from sqlalchemy import insert


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        FITTRACK_MYSQL_USER = getenv('FITTRACK_MYSQL_USER')
        FITTRACK_MYSQL_PWD = getenv('FITTRACK_MYSQL_PWD')
        FITTRACK_MYSQL_HOST = getenv('FITTRACK_MYSQL_HOST')
        FITTRACK_MYSQL_DB = getenv('FITTRACK_MYSQL_DB')
        FITTRACK_ENV = getenv('FITTRACK_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(FITTRACK_MYSQL_USER,
                                             FITTRACK_MYSQL_PWD,
                                             FITTRACK_MYSQL_HOST,
                                             FITTRACK_MYSQL_DB))
        if FITTRACK_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def get_routine(self, id):
        """Return a user consumable dataset."""
        from models.routine import Routine
        routine = self.get(Routine, id)
        if routine is None:
            return False, {}
        # expand program
        program_wanted_keys = [
            "body_focus_id", "description", "difficulty", "duration",
            "goals", "rating", "reviewers", "title"
        ]
        from models.program import Program
        program = self.get(Program, routine.program_id)
        program_data = dict()
        for key, value in program.to_dict().items():
            if key not in program_wanted_keys:
                continue
            if key == "body_focus_id":
                key = "body_part"
            else:
                program_data[key] = value
        # expand workout_days
        workout_day_wanted_keys = [
            "completed_status", "date"
        ]
        workout_day_list = list()
        for wd_obj in routine.workout_days:
            wd_data = dict()
            for k, v in wd_obj.to_dict().items():
                if key not in workout_day_wanted_keys:
                    continue
                wd_data[k] = v
            # populate fields from the workout
            from models.workout import Workout
            workout = self.get(Workout, wd_obj.workout_id)
            wd_data['workout_likes'] = len(workout.likes)
            wd_data['workout_title'] = workout.title
            wd_data['workout_day_position'] = workout.workout_day
            # also video
            video_wanted_keys = [
                "description", "thumbnail_height", "thumbnail_width",
                "thumbnail_url", "title", "youtube_video_id"
            ]
            video_data = dict()
            from models.video import Video
            video = self.get(Video, workout.video_id)
            for k, v in video.to_dict().items():
                if k not in video_wanted_keys:
                    continue
                video_data[k] = v
            wd_data["video"] = video_data
            workout_day_list.append(wd_data)
        # now populate routine data
        routine_wanted_keys = [
            "percent_completion", "start_date", "end_date", "user_id"
        ]
        routine_data = dict()
        for k, v in routine.to_dict().items():
            if k not in routine_wanted_keys:
                continue
            routine_data[k] = v
        routine_data["program"] = program_data
        routine_data["workout_days"] = workout_day_list

        return True, routine_data


    def insert(self, table_obj, values_dict):
        """Insert objects into a table, use for association tables."""
        stmt = insert(table_obj).values(**values_dict)
        self.__session.execute(stmt)
        self.__session.commit()
        return True, 'success'

    def get_user(self, **kwargs):
        """return a user based on attribute(s)."""
        if not kwargs:
            return
        priority_list = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "weight",
            "age"
        ]
        filter_by_dict = dict()
        for attr in priority_list:
            if attr not in kwargs:
                continue
            key, value = attr, kwargs[attr]
            filter_by_dict[key] = value

        from models.user import User
        user_obj = self.__session.query(User).filter_by(**filter_by_dict).first()

        return user_obj


    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        from models import CLASSES as classes
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """A method to retrieve one object
        Args:
            cls (str): class name
            id (str): object ID
        Returns:
            object: the object if found, None if not found
        """
        if cls and id:
            return self.__session.get(cls, id)
        return None

    def count(self, cls=None):
        """A method to count the number of objects in storage
        Args:
            cls (str): class name
        """
        if cls:
            return len(self.all(cls))
        return len(self.all())
