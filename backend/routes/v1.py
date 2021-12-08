

from starlette.status import HTTP_401_UNAUTHORIZED
from utlities.security import check_token
from fastapi import FastAPI, Depends, HTTPException, APIRouter
import uvicorn
from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import update, insert, delete

import models
from database import engine_local,engine_remote, SessionLocal, SessionRemote
from read_puzzles import get_puzzles
import schemas
import crud
import time

from fastapi.middleware.cors import CORSMiddleware

from random import randint

app_v1 = APIRouter()

# CORS middelware to allow http requests NEED TO MODIFY FOR PRODUCTION
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# app_v1.middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

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
@app_v1.get('/', tags=["Testing"])
def read_root():
        return {'Hello': 'world'}

# get 100 ratings (testing)
@app_v1.get('/users/themes/', response_model=List[schemas.Theme], tags=["Testing"])
def read_ratings(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    ratings = crud.get_all_ratings(db, skip=skip, limit=limit)
    return ratings

# get users
@app_v1.get('/users', tags=["Testing"])
def get_users(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


# PUZZLES

# get module puzzles
@app_v1.get('/puzzles/', tags=["Puzzles"])
def read_puzzles(rating: int, theme: str, db: Session = Depends(get_local_db)):
   puzzle = get_puzzles(db,rating, theme)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle


# USER

# create user
@app_v1.post('/users', response_model=schemas.User, tags=["User"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user.user_id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    return crud.create_user(db=db, user=user)

# get user
@app_v1.get('/users/{user_id}', response_model=schemas.UserProfile, tags=["User"])
async def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# update user
@app_v1.put('/users/{user_id}', response_model=schemas.UserUpdate, tags=["User"])
async def update_user(user_id: str, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    stmt = (update(models.User).where(models.User.user_id == user_id).values(**user.dict()))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    
    return db_user

# get user initial rating
@app_v1.get('/users/{user_id}/initial-rating')
async def get_user_initial_rating(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    return {db_user.initial_rating}

# THEMES

# get theme
@app_v1.get('/users/{user_id}/themes/{theme_title}', response_model=schemas.Theme, tags=["Themes"])
async def return_theme_rating(user_id: str, theme_title: str, db: Session = Depends(get_db)):
    theme_response = db.query(models.Theme).filter(models.Theme.title == theme_title, models.Theme.owner_id==user_id).one_or_none()
    if theme_response is None:
        raise HTTPException(status_code=404, detail="Theme not found")
    #crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_response

# get themes
@app_v1.get('/users/{user_id}/themes', response_model=List[schemas.Theme], tags=["Themes"])
async def return_all_themes(user_id: str, db: Session = Depends(get_db)):
    themes = db.query(models.Theme).filter(models.Theme.owner_id == user_id).all()
    if themes is None:
        raise HTTPException(status_code=404, detail="Themes not found")
    return themes

# initialize theme
@app_v1.post('/users/{user_id}/themes', response_model=schemas.Theme, tags=["Themes"])
async def define_theme_ratings(user_id: str, theme: schemas.CreateTheme, db: Session = Depends(get_db)):
    theme_ratings = crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_ratings

# update theme
@app_v1.put("/users/{user_id}/themes", response_model = schemas.User, tags=["Themes"])
async def update_theme_rating(user_id: str, theme: schemas.Theme, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    db.add(db_user)
    stmt = (update(models.Theme).where(models.Theme.owner_id == user_id).where(models.Theme.title == theme.title).values(rating=theme.rating, completed=theme.completed, high_score=theme.high_score, score_history=theme.score_history, high_rating=theme.high_rating))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return db_user

# DAILY PUZZLES

# generate user's daily puzzles
@app_v1.get('/users/{user_id}/daily_puzzles/picks', tags=["Daily"])
#async def get_daily_puzzle_picks(user_id: str, db: Session = Depends(get_db)):
async def get_daily_puzzle_picks():
    # generate daily puzzle module picks
    daily_puzzles = []
    while (len(daily_puzzles) < 3): # we want three modules
        pick = randint(1,38) # picks random module (how sophisticated!)
        if pick not in daily_puzzles: # checks that modules don't repeat
            daily_puzzles.append(pick)
    daily_puzzles.append(randint(39,60)) # adds a random opening
    return daily_puzzles

# get user's daily puzzles
@app_v1.get('/users/{user_id}/daily_puzzles', tags=["Daily"])
async def get_daily_puzzles(user_id: str, db: Session = Depends(get_db)):
    daily_puzzles = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()
    if daily_puzzles is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(daily_puzzles) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")

    return daily_puzzles

# create new user daily puzzles
@app_v1.post('/users/{user_id}/daily_puzzles', tags=["Daily"])
async def create_daily_puzzles( user_id: str, puzzles: List[schemas.CreateDailyPuzzle], db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    for puzzle in puzzles:
        db_daily_puzzle = models.DailyPuzzle(**puzzle.dict(), owner_id = user_id)
        db.add(db_daily_puzzle)
        db.commit()
        db.refresh(db_daily_puzzle)
        
    return 'successful'

# update user daily puzzles
@app_v1.put("/users/{user_id}/daily_puzzles", tags=["Daily"])
async def update_daily_puzzles(user_id: str, puzzles: List[schemas.CreateDailyPuzzle], db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
        return None

    for puzzle in puzzles:
        stmt = (update(models.DailyPuzzle).where(models.DailyPuzzle.owner_id == user_id).where(models.DailyPuzzle.location == puzzle.location).values(theme_id=puzzle.theme_id, title=puzzle.title, locked=puzzle.locked, completed=puzzle.completed, inserted_at=puzzle.inserted_at))
        db.execute(stmt)
    
    db.commit()
    db.refresh(db_user)
    return 'successfully updated'

# remove daily puzzle
@app_v1.delete('/users/{user_id}/daily_puzzles', tags=["Daily"])
async def delete_theme(user_id: str, theme_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None

    stmt = (delete(models.DailyPuzzle).where(models.DailyPuzzle.owner_id == user_id).where(models.DailyPuzzle.theme_id == theme_id))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return db_user


## ACHIEVEMENTS

# create new user achievment
@app_v1.post('/achievements/{user_id}', tags=["Achievements"])
async def add_achievement(user_id: str, achievement: schemas.AchievementCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db_achievement= models.Achievement(**achievement.dict(), owner_id = user_id)
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    return {"achievement successfully created"}

# get all user achievements
@app_v1.get('/achievements/{user_id}', response_model=List[schemas.Achievement], tags=["Achievements"])
async def get_achievements(user_id: str, db: Session = Depends(get_db), limit: int = 20):
    achievements = db.query(models.Achievement).filter(models.Achievement.owner_id == user_id).limit(limit).all() # daily: .filter(models.Achievement.inserted_at >= time.time() (but for today))
    if achievements is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(achievements) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")

    return achievements

# get user daily achievements
@app_v1.get('/achievements/{user_id}/daily', response_model=List[schemas.Achievement], tags=["Achievements"])
async def get_achievements(user_id: str, db: Session = Depends(get_db)):
    achievements = db.query(models.Achievement).filter(models.Achievement.owner_id == user_id).filter(models.Achievement.inserted_at > ((time.time()*1000)-(3600*24*1000))).all() # daily: .filter(models.Achievement.inserted_at >= time.time() (but for today))
    if achievements is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(achievements) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    else: 
        return achievements


## OPENINGS

# get user opening data
@app_v1.get('/openings/{user_id}/{opening_id}', response_model=schemas.Opening, tags=["Openings"])
async def get_opening(user_id: str, opening_id: str, db: Session = Depends(get_db)):
    opening = db.query(models.Opening).filter(models.Opening.owner_id == user_id).filter(models.Opening.opening_id == opening_id).one_or_none()
    if opening is None:
        raise HTTPException(status_code=404, detail="opening not found")
    else: 
        return opening

# create user opening 
@app_v1.post('/openings/{user_id}/{opening_id}', tags=["Openings"])
async def add_opening(user_id: str, opening_id: str, opening: schemas.OpeningCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db_opening= models.Opening(**opening.dict(), owner_id = user_id)
    db.add(db_opening)
    db.commit()
    db.refresh(db_opening)
    return {"opening successfully created"}

# update user opening data
@app_v1.put('/openings/{user_id}/{opening_id}', tags=["Openings"])
async def update_opening(user_id: str, opening_id: int, opening: schemas.Opening, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    stmt = (update(models.Opening).where(models.Opening.owner_id == user_id).where(models.Opening.opening_id == opening.opening_id).values(**opening.dict()))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return {"opening successfully updated"}