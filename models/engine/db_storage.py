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

    def insert(self, table_obj, values_dict):
        """Insert objects into a table, use for association tables."""
        self.close()
        try:
            with self.__engine.connect() as conn:
                stmt = insert(table_obj).values(**values_dict)
                result = conn.execute(stmt)
                conn.commit()
                self.reload()
        except Exception as e:
            print(e)
            return False
        
        return True

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
