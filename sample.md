# Table of Contents

* [..console](#..console)
  * [FitTrackCommand](#..console.FitTrackCommand)
    * [do\_EOF](#..console.FitTrackCommand.do_EOF)
    * [emptyline](#..console.FitTrackCommand.emptyline)
    * [do\_quit](#..console.FitTrackCommand.do_quit)
    * [do\_create](#..console.FitTrackCommand.do_create)
    * [do\_show](#..console.FitTrackCommand.do_show)
    * [do\_destroy](#..console.FitTrackCommand.do_destroy)
    * [do\_all](#..console.FitTrackCommand.do_all)
    * [do\_update](#..console.FitTrackCommand.do_update)
* [..models.routine](#..models.routine)
  * [Routine](#..models.routine.Routine)
* [..models.base\_model](#..models.base_model)
  * [BaseModel](#..models.base_model.BaseModel)
    * [\_\_init\_\_](#..models.base_model.BaseModel.__init__)
    * [\_\_str\_\_](#..models.base_model.BaseModel.__str__)
    * [save](#..models.base_model.BaseModel.save)
    * [to\_dict](#..models.base_model.BaseModel.to_dict)
    * [delete](#..models.base_model.BaseModel.delete)
* [..models](#..models)
* [..models.article](#..models.article)
  * [Article](#..models.article.Article)
* [..models.user](#..models.user)
  * [User](#..models.user.User)
* [..models.program](#..models.program)
  * [Program](#..models.program.Program)
* [..models.workout](#..models.workout)
  * [Workout](#..models.workout.Workout)
* [..models.video](#..models.video)
  * [Video](#..models.video.Video)
* [..models.engine](#..models.engine)
* [..models.engine.db\_storage](#..models.engine.db_storage)
  * [DBStorage](#..models.engine.db_storage.DBStorage)
    * [\_\_init\_\_](#..models.engine.db_storage.DBStorage.__init__)
    * [all](#..models.engine.db_storage.DBStorage.all)
    * [new](#..models.engine.db_storage.DBStorage.new)
    * [save](#..models.engine.db_storage.DBStorage.save)
    * [delete](#..models.engine.db_storage.DBStorage.delete)
    * [reload](#..models.engine.db_storage.DBStorage.reload)
    * [close](#..models.engine.db_storage.DBStorage.close)
    * [get](#..models.engine.db_storage.DBStorage.get)
    * [count](#..models.engine.db_storage.DBStorage.count)
* [..Sphinx-docs.conf](#..Sphinx-docs.conf)

<a id="..console"></a>

# ..console

console

<a id="..console.FitTrackCommand"></a>

## FitTrackCommand Objects

```python
class FitTrackCommand(cmd.Cmd)
```

HBNH console

<a id="..console.FitTrackCommand.do_EOF"></a>

#### do\_EOF

```python
def do_EOF(arg)
```

Exits console

<a id="..console.FitTrackCommand.emptyline"></a>

#### emptyline

```python
def emptyline()
```

overwriting the emptyline method

<a id="..console.FitTrackCommand.do_quit"></a>

#### do\_quit

```python
def do_quit(arg)
```

Quit command to exit the program

<a id="..console.FitTrackCommand.do_create"></a>

#### do\_create

```python
def do_create(arg)
```

Creates a new instance of a class

<a id="..console.FitTrackCommand.do_show"></a>

#### do\_show

```python
def do_show(arg)
```

Prints an instance as a string based on the class and id

<a id="..console.FitTrackCommand.do_destroy"></a>

#### do\_destroy

```python
def do_destroy(arg)
```

Deletes an instance based on the class and id

<a id="..console.FitTrackCommand.do_all"></a>

#### do\_all

```python
def do_all(arg)
```

Prints string representations of instances

<a id="..console.FitTrackCommand.do_update"></a>

#### do\_update

```python
def do_update(arg)
```

Update an instance based on the class name, id, attribute & value

<a id="..models.routine"></a>

# ..models.routine

Handles the class Routine

A routine is a period (time and period) within which a workout
is done.

<a id="..models.routine.Routine"></a>

## Routine Objects

```python
class Routine(BaseModel, Base)
```

Representation of a Routine

<a id="..models.base_model"></a>

# ..models.base\_model

Contains class BaseModel

<a id="..models.base_model.BaseModel"></a>

## BaseModel Objects

```python
class BaseModel()
```

The BaseModel class from which future classes will be derived

<a id="..models.base_model.BaseModel.__init__"></a>

#### \_\_init\_\_

```python
def __init__(*args, **kwargs)
```

Initialization of the base model

<a id="..models.base_model.BaseModel.__str__"></a>

#### \_\_str\_\_

```python
def __str__()
```

String representation of the BaseModel class

<a id="..models.base_model.BaseModel.save"></a>

#### save

```python
def save()
```

updates the attribute 'updated_at' with the current datetime

<a id="..models.base_model.BaseModel.to_dict"></a>

#### to\_dict

```python
def to_dict()
```

returns a dictionary containing all keys/values of the instance

<a id="..models.base_model.BaseModel.delete"></a>

#### delete

```python
def delete()
```

delete the current instance from the storage

<a id="..models"></a>

# ..models

initialize the models package

<a id="..models.article"></a>

# ..models.article

A module for the class Article

<a id="..models.article.Article"></a>

## Article Objects

```python
class Article(BaseModel, Base)
```

Representation of a article

<a id="..models.user"></a>

# ..models.user

holds class User

<a id="..models.user.User"></a>

## User Objects

```python
class User(BaseModel, Base)
```

Representation of a user

<a id="..models.program"></a>

# ..models.program

A module for the class Program

<a id="..models.program.Program"></a>

## Program Objects

```python
class Program(BaseModel, Base)
```

Representation of a program

<a id="..models.workout"></a>

# ..models.workout

Handles the class Workout

A workout is an exercise that a user does.
For example; Press ups, Pull ups, Yoga

<a id="..models.workout.Workout"></a>

## Workout Objects

```python
class Workout(BaseModel, Base)
```

Representation of a Workout

<a id="..models.video"></a>

# ..models.video

A module for the class video

<a id="..models.video.Video"></a>

## Video Objects

```python
class Video(BaseModel, Base)
```

Representation of a video

<a id="..models.engine"></a>

# ..models.engine

<a id="..models.engine.db_storage"></a>

# ..models.engine.db\_storage

Contains the class DBStorage

<a id="..models.engine.db_storage.DBStorage"></a>

## DBStorage Objects

```python
class DBStorage()
```

interaacts with the MySQL database

<a id="..models.engine.db_storage.DBStorage.__init__"></a>

#### \_\_init\_\_

```python
def __init__()
```

Instantiate a DBStorage object

<a id="..models.engine.db_storage.DBStorage.all"></a>

#### all

```python
def all(cls=None)
```

query on the current database session

<a id="..models.engine.db_storage.DBStorage.new"></a>

#### new

```python
def new(obj)
```

add the object to the current database session

<a id="..models.engine.db_storage.DBStorage.save"></a>

#### save

```python
def save()
```

commit all changes of the current database session

<a id="..models.engine.db_storage.DBStorage.delete"></a>

#### delete

```python
def delete(obj=None)
```

delete from the current database session obj if not None

<a id="..models.engine.db_storage.DBStorage.reload"></a>

#### reload

```python
def reload()
```

reloads data from the database

<a id="..models.engine.db_storage.DBStorage.close"></a>

#### close

```python
def close()
```

call remove() method on the private session attribute

<a id="..models.engine.db_storage.DBStorage.get"></a>

#### get

```python
def get(cls, id)
```

A method to retrieve one object

**Arguments**:

- `cls` _str_ - class name
- `id` _str_ - object ID

**Returns**:

- `object` - the object if found, None if not found

<a id="..models.engine.db_storage.DBStorage.count"></a>

#### count

```python
def count(cls=None)
```

A method to count the number of objects in storage

**Arguments**:

- `cls` _str_ - class name

<a id="..Sphinx-docs.conf"></a>

# ..Sphinx-docs.conf

