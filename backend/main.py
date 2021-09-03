from fastapi import FastAPI, Depends, HTTPException

import uvicorn
from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import update, insert, delete

import models
from database import engine_local,engine_remote, SessionLocal, SessionRemote
from read_puzzles import get_puzzles
import schemas
import crud

from fastapi.middleware.cors import CORSMiddleware

from random import randint

app = FastAPI()

# CORS middelware to allow http requests NEED TO MODIFY FOR PRODUCTION
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine_remote)
models.Base.metadata.create_all(engine_local)

# Dependency
def get_db():
    db = SessionRemote()
    try:
        yield db
    finally:
        db.close()

def get_local_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

## TESTING

# testing
@app.get('/')
def read_root():
        return {'Hello': 'world'}

# get 100 ratings (testing)
@app.get('/users/themes/', response_model=List[schemas.Theme])
def read_ratings(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    ratings = crud.get_all_ratings(db, skip=skip, limit=limit)
    return ratings

# get users
@app.get('/users')
def get_users(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


# PUZZLES

# get module puzzles
@app.get('/puzzles/')
def read_puzzles(rating: int, theme: str, db: Session = Depends(get_local_db)):
   puzzle = get_puzzles(db,rating, theme)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle


# USER

# create user
@app.post('/users/', response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user.user_id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    return crud.create_user(db=db, user=user)

# get user
@app.get('/users/{user_id}', response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# THEMES
# get theme
@app.get('/users/{user_id}/themes/{theme_title}', response_model=schemas.Theme)
def define_theme_ratings(user_id: str, theme_title: str, db: Session = Depends(get_db)):
    theme_response = db.query(models.Theme).filter(models.Theme.title == theme_title, models.Theme.owner_id==user_id).one_or_none()
    if theme_response is None:
        raise HTTPException(status_code=404, detail="Theme not found")
    #crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_response


# initialize theme
@app.post('/users/{user_id}/themes/', response_model=schemas.Theme)
def define_theme_ratings(user_id: str, theme: schemas.CreateTheme, db: Session = Depends(get_db)):
    theme_ratings = crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_ratings

# update theme
@app.put("/users/themes/{user_id}", response_model = schemas.User)
async def update_theme_rating(user_id: str, theme: schemas.Theme, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    db.add(db_user)
    stmt = (update(models.Theme).where(models.Theme.owner_id == user_id).where(models.Theme.title == theme.title).values(rating=theme.rating, completed=theme.completed, high_score=theme.high_score))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return db_user

# DAILY PUZZLES

# get user's daily puzzles
@app.get('/users/{user_id}/daily_puzzles')
def get_daily_puzzles():
    #daily_puzzles = [randint(0,45),randint(0,45),randint(0,45)];
    daily_puzzles = []
    while (len(daily_puzzles) < 4): # we want three modules
        pick = randint(0,45) # picks random module (how sophisticated!)
        if pick not in daily_puzzles: # checks that modules don't repeat
            daily_puzzles.append(pick)

    return daily_puzzles

# create new user daily puzzles
@app.post('/users/{user_id}/daily_puzzles',response_model = schemas.User)
def create_daily_puzzles( user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db.add(db_user)
    for i in range(1,4): 
        #updates each module based on input results
        stmt = (insert(models.DailyPuzzle).values(location=i, theme_id = i, title = 'default', completed=False, locked=False, owner_id=user_id))
        db.execute(stmt)

    db.commit()
    db.refresh(db_user)
    return db_user

# update user daily puzzles
@app.put("/users/{user_id}/daily_puzzles", response_model = schemas.User)
async def update_daily_puzzles(user_id: str, puzzle: schemas.DailyPuzzle, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
        return None
    
    db.add(db_user)
    #for puzzle in dailyPuzzles:
        #updates each module based on input results  
    stmt = (update(models.DailyPuzzle).where(models.DailyPuzzle.owner_id == user_id).where(models.DailyPuzzle.location == puzzle.location).values(theme_id=puzzle.theme_id, title=puzzle.title, locked=puzzle.locked, completed=puzzle.completed))
    db.execute(stmt)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# remove daily puzzle
@app.put('/users/{user_id}/daily_puzzles/delete')
def delete_theme(user_id: str, theme_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    db.add(db_user)
    stmt = (delete(models.DailyPuzzle).where(models.DailyPuzzle.owner_id == user_id).where(models.DailyPuzzle.theme_id == theme_id))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return db_user


if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000)