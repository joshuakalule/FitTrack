# FitTrack
[FitTrack](http://web-02.onepimeht.tech) is a comprehensive fitness platform designed to empower individuals of all fitness levels to achieve their health and wellness goals. Through cutting-edge technology and user-friendly features, FitTrack provides a personalized fitness experience that includes intuitive workout tracking and personalized exercise recommendations. More than just a website,. With its innovative approach and commitment to user empowerment. FitTrack is poised to revolutionize the future of fitness. Welcome to FitTrack—the ultimate fitness companion for achieving your goals and living your best life.

## Project Overview

The website functions like a modern library with two main sections: the **Frontend** and the **Backend**.

### Frontend (The Library Layout)
- **Built with React**: Our interactive website elements are created using React, similar to a library's layout that helps visitors navigate.
- **Static Content**: Handled by **Nginx**, these are the parts of the website that remain constant, akin to the bookshelves in a library.

### Backend (The Library Management Office)
- **Built with Flask**: Our website's dynamic management is powered by Flask, comparable to a library's catalog system for book management.
- **Dynamic Content**: Updated information provided by **Gunicorn**, resembling a librarian providing the latest book on a topic.
- **Database**: Stores data in a MYSQL database which is like the entire library containing books

### How They Work Together
When you visit our website, Nginx displays the static content first, like seeing the bookshelves upon entering a library. For more specific, current information, Gunicorn and Flask collaborate to provide it from the database, just as a librarian would assist you with finding the latest book.

## Table of Content
* [Environment](#environment)
* [Installation](#installation)
* [Usage](#usage)
* [File Descriptions](#file-descriptions)
  * [Api](#api-directory)
  * [Models](#models-directory)
  * [Engine](#engine-directory)
* [Bugs](#bugs)
* [Contributing](#contributing)
* [Licensing](#licensing)
* [Authors](#authors)

## Environment
This project is interpreted/tested on Ubuntu 20.04.6 LTS (Focal Fossa) using python3 (version 3.4.3)

## Installation
* Clone this repository: `git clone "https://github.com/joshuakalule/FitTrack.git"`
* Access FitTrack directory: `cd FitTrack`
* Run console(interactively): `./console` and enter command
* Run console(non-interactively): `echo "<command>" | ./console.py`

## Usage
Sign up at [Fittrack Sign up](http://web-02.onepimeht.tech/signup), enter user details and the application will recommend workouts based on the user goals. Happy working out!😁

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

### Api directory
The [api](/api) folder houses files that handle all api calls that expose endpoints to access data from the backend.

| Endpoint | File |
| -------------------------------- | -------------------- |
| `api/v1/articles` | [articles.py](api/v1/views/articles.py) |
| `api/v1/articles/<article_id>` | [articles.py](api/v1/views/articles.py) |
| `api/v1/body_focus` | [body_focus.py](api/v1/views/body_focus.py) |
| `api/v1/body_focus/<body_focus_id>` | [body_focus.py](api/v1/views/body_focus.py) |
| `api/v1/goals` | [goals.py](api/v1/views/goals.py) |
| `api/v1/goals/<goal_id>` | [goals.py](api/v1/views/goals.py) |
| `api/v1/status` | [index.py](api/v1/views/index.py) |
| `api/v1/stats` | [index.py](api/v1/views/index.py) |
| `api/v1/programs` | [programs.py](api/v1/views/programs.py) |
| `api/v1/programs/<program_id>` | [programs.py](api/v1/views/programs.py) |
| `api/v1/program_reviews` | [reviews.py](api/v1/views/reviews.py) |
| `api/v1/program_reviews` | [reviews.py](api/v1/views/reviews.py) |
| `api/v1/program_reviews/<program_review_id>` | [reviews.py](api/v1/views/reviews.py) |
| `api/v1/program_reviews/<program_review_id>` | [reviews.py](api/v1/views/reviews.py) |
| `api/v1/program_reviews/<program_review_id>` | [reviews.py](api/v1/views/reviews.py) |
| `api/v1/routines/<routine_id>/completion` | [routines.py](api/v1/views/routines.py) |
| `api/v1/routines` | [routines.py](api/v1/views/routines.py) |
| `api/v1/routines/<routine_id>` | [routines.py](api/v1/views/routines.py) |
| `api/v1/routines/<routine_id>` | [routines.py](api/v1/views/routines.py) |
| `api/v1/routines/<routine_id>` | [routines.py](api/v1/views/routines.py) |
| `api/v1/add_program/<user_id>` | [routines.py](api/v1/views/routines.py) |
| `api/v1/users/<user_id>/goals` | [users.py](api/v1/views/users.py) |
| `api/v1/users` | [users.py](api/v1/views/users.py) |
| `api/v1/users/<user_id>` | [users.py](api/v1/views/users.py) |
| `api/v1/users/<user_id>` | [users.py](api/v1/views/users.py) |
| `api/v1/users` | [users.py](api/v1/views/users.py) |
| `api/v1/login` | [users.py](api/v1/views/users.py) |
| `api/v1/protected` | [users.py](api/v1/views/users.py) |
| `api/v1/users/<user_id>` | [users.py](api/v1/views/users.py) |
| `api/v1/videos` | [videos.py](api/v1/views/videos.py) |
| `api/v1/videos/<video_id>` | [videos.py](api/v1/views/videos.py) |
| `api/v1/workout_days/<workout_day_id>` | [workout_days.py](api/v1/views/workout_days.py) |
| `api/v1/workout_days` | [workout_days.py](api/v1/views/workout_days.py) |
| `api/v1/workout_days/<workout_day_id>` | [workout_days.py](api/v1/views/workout_days.py) |
| `api/v1/workouts` | [workouts.py](api/v1/views/workouts.py) |
| `api/v1/workouts/<workout_id>` | [workouts.py](api/v1/views/workouts.py) |

### Models directory
The [models](/models) folder contains the models that are the backbone of datastorage and retrieval. These define the types of data and relationships.
These are the models used;
* [BaseModel](/models/base_model.py): Template containing attributes; id, created_at, and updated_at.
* [Article](/models/article.py): An article is like a brief blog talking about a specific workout, recommended programs, to-dos and not to-dos.
* [BodyFocus](/models/body_focus.py): These are parts of a body a user, program or workout focuses on.
* [Goal](/models/goal.py): A goal is an end result that a user, or program intends to achieve.
* [Program](/models/program.py): A program is a structure consisting of workouts and the days to do them that a user can take on in their fitness journey.
* [ProgramReview](/models/review.py): Handles reviews a user makes on a program.
* [Routine](/models/routine.py): A routine is a user attached structure adopted from a program that specifies the start and end date as well as keep track of user progress.
* [User](/models/user.py): Handles user information
* [Video](/models/video.py): Handles video information
* [Workout](/models/workout.py): A workout is an engagement that a user can do as they exercise and keep fit.
* [WorkoutDay](/models/workout_day.py): A WorkoutDay is a user attached instance of a workout that specifies the day of action as well as user progress.

### Engine directory
The [engine](/models/engine) folder consists of files that handle all data saving and retrieval.

[DBStorage](/models/engine/db_storage.py): Handles data storage and retrieval from the Database using SQLAlchamey. The `storage` instance is created from this class.

##### Functionalities of the storage instance:
* `storage.all(cls=None)` - get all objects if cls is None, else retrieve a list of all cls objects.
* `storage.close()` - close/release the current session. This provides room for data to be fetched from the database thereby allowing changes made to reflect immediately.
* `storage.count(cls=None)` - counts the number of `cls` instances in the current session, or all objects if None.
* `storage.delete(obj)` - delete `obj` from the session.
* `storage.get(cls, id)` -  get the instance of `cls` with the id `id`
* `storage.get_user(self, **kwargs)` - retrieves a user based on the key word arguments provided.
* `storage.insert(self, table_obj, values_dict)` - used to insert rows into association tables.
* `storage.new(obj)` - add `obj` into the session. This is the temporary storage before adding to the database.
* `storage.reload()` - fetch data from the database and load it into the session.
* `storage.save()` - commits/saves the current changes in the session into the database.


`/tests` directory contains all unit test cases for this project

## Bugs
* When using `create Class attr="attr_value"` in console.py, adding a space in the *attr_value* will disqualify the attribute.

## Contributing
All creators whose videos shall be shown

## Licensing
GNU General Public License (GPLv3)

## Authors
* Joshua Kalule - [Github](https://github.com/joshuakalule) / [Twitter](https://twitter.com/KarlYoshua)
* Pimeh Tare-ere - [Github](https://github.com/PimehT) / [Twitter](https://twitter.com/pimehere)
* Arthur Apedo Justin - [Github](https://github.com/creeds-knight) / [Twitter](https://x.com/aped_o)
