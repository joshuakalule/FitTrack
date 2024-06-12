# FitTrack
[FitTrack](http://web-02.onepimeht.tech) is a comprehensive fitness platform designed to empower individuals of all fitness levels to achieve their health and wellness goals. Through cutting-edge technology and user-friendly features, FitTrack provides a personalized fitness experience that includes intuitive workout tracking and personalized exercise recommendations. More than just a website,. With its innovative approach and commitment to user empowerment. FitTrack is poised to revolutionize the future of fitness. Welcome to FitTrack—the ultimate fitness companion for achieving your goals and living your best life.

## Table of Content
* [Environment](#environment)
* [Installation](#installation)
* [File Descriptions](#file-descriptions)
* [Bugs](#bugs)
* [Authors](#authors)

## Environment
This project is interpreted/tested on Ubuntu 20.04.6 LTS (Focal Fossa) using python3 (version 3.4.3)

## Installation
* Clone this repository: `git clone "https://github.com/joshuakalule/FitTrack.git"`
* Access FitTrack directory: `cd FitTrack`
* Run console(interactively): `./console` and enter command
* Run console(non-interactively): `echo "<command>" | ./console.py`

## File Descriptions
[console.py](console.py)
The console contains the entry point of the command intepreter. It has the following functionalities.
1. Create a new object e.g a new User or a new Program
2. Retrieve an object from the database
3. Do operations on objects such as count
4. Update attributes of an object
5. Destroy an object

List of commands this console currently supports
* `quit` - exits console
* `<emptyline>` - overwrites default emptyline method and does nothing
* `create` - Creates a new instance of`BaseModel`, saves it (to the JSON file) and prints the id
* `destroy` - Deletes an instance based on the class name and id (save the change into the JSON file).
* `show` - Prints the string representation of an instance based on the class name and id.
* `all` - Prints all string representation of all instances based or not on the class name.
* `update` - Updates an instance based on the class name and id by adding or updating attribute (save the change into the JSON file).

### `models/` directory
[base_model.py](/models/base_model.py)
The `BaseModel()` class is the class from which other classes inherit. Acts as a template containing attributes; id, created_at, and updated_at
* `def save(self)` - saves the current instance into the database by calling [storage.save()](/models/__init__.py). Also updates the value of updated_at to the current time.
* `def to_dict(self)` - returns a dictionary containing all keys/values of the instance.

### Models 
These models inherit from `BaseModel()` and `Base()`);NBSP

[article.py](/models/article.py)
The `Article()` class handles articles. An article is like a brief blog talking about a specific workout, recommended programs, to-dos and not to-dos.
* title - title of the article
* author - author of the article
* content - content of the article

[program.py](/models/program.py)
The `Program()` class handles the program of the user. A program is a collection of workouts and their routines that a user shall follow to achieve their fitness goals.
* name - name of the program
* user_id - id of user of the program
* start_date - start date of the program
* end_date - end date of the program

[routine.py](/models/routine.py)
The `Routine()` class handles routines of users. A routine is a period (time and period) within which a workout is done. For example; Doing *yoga* for *30 minutes* *3 times a week* is a routine.
* title - name of the routine
* description - description of the routine
* program_id - id of the program within which this routine was made
* workout_id - id of the workout being done
* workout_time - time of the workout e.g *30 minutes*
* workout_period - period to do the workout e.g *3 times a week*

[user.py](/models/user.py)
The `User()` class handles the user information.
* username - alias name of the user
* first_name - first name
* last_name - last name
* email - email
* password - password
* weight - weight
* age - age

[video.py](/models/video.py)
The `Video()` class handles the video information.
* workout_id - id of the workout that this video is showing
* name - name of the video
* link - link to the video
* thumbnail_path - path to the thumbnail
* description - a short description

[workout.py](/models/workout.py)
The `Workout()` class handles the workouts of the user. A workout is an exercise that a user can do. For example; Press-ups, pull-ups, squarts, yoga
* name - name of thw workout
* program_id - id of the program this workout has been attached


#### `/models/engine` directory contains the DBStorage class 
[db_storage.py](/models/engine/db_storage.py)
The `DBStorage()` class handles data storage and retrieval from the Database using SQLAlchamey. The `storage` instance is created from this class.

##### Functionalities of the storage instance:
* `storage.all(cls=None)` - get all objects if cls is None, else retrieve a list of all cls objects.
* `storage.new(obj)` - add `obj` into the session. This is the temporary storage before adding to the database.
* `storage.save()` - commits/saves the current changes in the session into the database.
* `storage.delete(obj)` - delete `obj` from the session.
* `storage.reload()` - fetch data from the database and load it into the session.
* `storage.close()` - close/release the current session. This provides room for data to be fetched from the database thereby allowing changes made to reflect immediately.
* `storage.get(cls, id)` -  get the instance of `cls` with the id `id`
* `storage.count(cls=None)` - counts the number of `cls` instances in the current session, or all objects if None.

`/tests` directory contains all unit test cases for this project

## Bugs
* When using `create Class attr="attr_value"` in console.py, adding a space in the *attr_value* will disqualify the attribute.

## Authors
* Joshua Kalule - [Github](https://github.com/joshuakalule) / [Twitter](https://twitter.com/KarlYoshua)
* Pimeh Tare-ere - [Github](https://github.com/PimehT) / [Twitter](https://twitter.com/pimehere)
* Arthur Apedo Justin - [Github](https://github.com/creeds-knight) / [Twitter](https://x.com/aped_o)
