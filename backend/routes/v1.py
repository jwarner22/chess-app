#from datetime import datetime
#from pickle import FALSE
#from this import d
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.sql.expression import func
from starlette.status import HTTP_401_UNAUTHORIZED
from utlities.security import check_token
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import uvicorn
from typing import Optional, List, Dict
import requests
from sqlalchemy.orm import Session
from sqlalchemy import null, update, insert, delete

import models
from database import engine_local,engine_remote, engine_local_openings, SessionLocal, SessionRemote, SessionLocalOpenings
from read_puzzles import get_puzzles
import schemas
import crud
import time

from fastapi.middleware.cors import CORSMiddleware

from random import randint, choices

app_v1 = APIRouter()

# CORS middelware to allow http requests NEED TO MODIFY FOR PRODUCTION
origins = [
    "http://localhost",
    "http://localhost:3000",
]


models.Base.metadata.create_all(engine_remote)
models.Base.metadata.create_all(engine_local)
models.Base.metadata.create_all(engine_local_openings)

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

def get_local_opening_db():
    db = SessionLocalOpenings()
    try:
        yield db
    finally:
        db.close()

## TESTING

# # testing
# @app_v1.get('/', tags=["Testing"])
# def read_root():
#         return {'Hello': 'world'}

# get users
@app_v1.get('/users', tags=["Testing"])
def get_users(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


## OPENING DATA

# get opening for ui
@app_v1.get('/openings-data/', response_model=List[schemas.Openings], tags=["Openings"]) # get opening data
def get_opening_data(moves: str, db: Session = Depends(get_local_opening_db)):
    moves_length = len(moves)
    # limit to two moves ahead
    openings = db.query(models.Openings).filter((func.length(models.Openings.uci) < (moves_length + 10)) & (models.Openings.uci.contains(moves))).all()
    return openings


@app_v1.get('/openings-data/lichess-explorer/', tags=["Openings"]) # request lichess explorer data for moves
async def get_lichess_explorer_data(moves: str, db: Session = Depends(get_local_opening_db)):
    moves_length = len(moves)
    openings = db.query(models.Openings).filter((func.length(models.Openings.uci) < (moves_length + 10)) & (models.Openings.uci.contains(moves))).all()

    # concatenate moves from spaces to commas
    moves_comma = ','.join(moves.split(' '))

    r = requests.get('https://explorer.lichess.ovh/lichess?play=' + moves_comma)
    r = r.json()

    for opening in openings:
        if opening.uci == moves:
            np_lichess = r['white'] + r['draws'] + r['black']
            stmt = update(models.Openings).where(models.Openings.uci == moves).values(np_lichess=np_lichess)
            db.execute(stmt)
            db.commit()
    
    next_moves = []
    next_moves_plays = []
    for move in r['moves']:
        next_move = moves + ' ' + move['uci']
        next_moves.append(next_move)
        next_moves_plays.append(move['white'] + move['draws'] + move['black'])
    
    for opening in openings:
        if (opening.uci in next_moves) and (opening.np_lichess is None):
            print('updated np plays for ' + opening.uci)
            index = next_moves.index(opening.uci)
            np_lichess = next_moves_plays[index]
            stmt = update(models.Openings).where(models.Openings.uci == opening.uci).values(np_lichess=np_lichess)
            db.execute(stmt)
            db.commit()

    openings = db.query(models.Openings).filter((func.length(models.Openings.uci) < (moves_length + 10)) & (models.Openings.uci.contains(moves))).all()
    return openings


## PUZZLES

# get module puzzles
@app_v1.get('/puzzles/', tags=["Puzzles"])
def read_puzzles(rating: int, theme: str, db: Session = Depends(get_local_db)):
   puzzle = get_puzzles(db,rating, theme)

   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle


## USER

# create user
@app_v1.post('/users', tags=["User"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user.user_id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    db_user = crud.create_user(db, user=user)
    return {'user created'}

# get user profile
@app_v1.get('/users/{user_id}', response_model=schemas.UserProfile, tags=["User"])
async def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# get all user data
@app_v1.get('/users/{user_id}/all', response_model=schemas.User, tags=["User"])
async def read_user_all(user_id: str, db: Session=Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()
    print(db_user)
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# update user
@app_v1.put('/users/{user_id}', response_model=schemas.UserProfile, tags=["User"])
async def update_user(user_id: str, user: schemas.UserProfile, db: Session = Depends(get_db)):
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

## THEMES

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
@app_v1.put("/users/{user_id}/themes", response_model = schemas.Theme, tags=["Themes"])
async def update_theme_rating(user_id: str, theme: schemas.Theme, db: Session = Depends(get_db)):

    db_theme = db.query(models.Theme).filter(models.Theme.title == theme.title, models.Theme.owner_id==user_id).one_or_none()
    
    if db_theme is None:
        return None
        
    stmt = (update(models.Theme).where(models.Theme.owner_id == user_id).where(models.Theme.title == theme.title).values(rating=theme.rating, completed=theme.completed, high_score=theme.high_score, score_history=theme.score_history, high_rating=theme.high_rating))
    db.execute(stmt)
    db.commit()
    db.refresh(db_theme)
    returned_theme = jsonable_encoder(db_theme)
    return returned_theme

## RATINGS
@app_v1.post("/users/{user_id}/themes/ratings/{rating}", tags=["Ratings"])
async def user_module_rating(user_id: str, theme_rating: schemas.ThemeRating, db: Session=Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db_rating = models.ThemeRating(**theme_rating.dict())
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)

    return {"rating posted"}

@app_v1.post("/users/{user_id}/openings/ratings/{rating}", tags=["Ratings"])
async def user_module_rating(user_id: str, opening_rating: schemas.OpeningRating, db: Session=Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db_rating = models.OpeningRating(**opening_rating.dict(), user_id = user_id)
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)

    return {"rating posted"}

## DAILY PUZZLES

# generate user's daily puzzles
@app_v1.put('/users/{user_id}/daily_puzzles/picks', response_model=schemas.DailyPicks, tags=["Daily"])
async def get_daily_puzzle_picks(embedding: List[schemas.Embedding], user_id: str, db: Session = Depends(get_db)):

    # generate daily puzzle module picks
    daily_puzzles = []
    excluded_ids = [] # exclude these moduless

    module_options = []
    for module in embedding:
        if module.id < 39:
            module_options.append(module.id)
    module_options = [x for x in module_options if x not in excluded_ids]

    module_weights = []
    for module in embedding:
        if module.id in module_options:
            module_weights.append(module.prob)

    picks = choices(module_options, weights=module_weights,k=3) # selects three modules based on user preference embedding

    # generate alternative module picks
    module_options = [x for x in module_options if x not in picks]
    module_weights = []
    for module in embedding:
        if module.id in module_options:
            module_weights.append(module.prob)

    alts = choices(module_options,k=3) # picks three alternative modules randomly 

    # generate opening picks    
    excluded_ids = [0, 48, 49, 50, 64] # exclude these modules

    module_options = []
    for module in embedding:
        if module.id > 38:
            module_options.append(module.id)
    module_options = [x for x in module_options if x not in excluded_ids]

    module_weights = []
    for module in embedding:
        if module.id in module_options:
            module_weights.append(module.prob)

    #while (opening_pick in excluded_ids): # ensures exluded ids are not picked
    opening_pick = choices(module_options, weights=module_weights,k=1) # picks random opening module
    
    picks.append(opening_pick[0]) # adds opening to picks
    
    print(picks)
    print(alts)
    
    picks_response = {
        "picks": picks,
        "alts": alts
    }

    return picks_response

# get user's daily puzzles
@app_v1.get('/users/{user_id}/daily_puzzles', tags=["Daily"])
async def get_daily_puzzles(user_id: str, db: Session = Depends(get_db)):
    daily_puzzles = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()
    if daily_puzzles is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(daily_puzzles) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")

    return daily_puzzles

# testing...
@app_v1.get('/users/{user_id}/daily_modules', tags=["Daily"])
async def get_daily_modules(user_id: str, db: Session = Depends(get_db)):
    
    daily_puzzles = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()

    # check if daily puzzles exist
    if daily_puzzles is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(daily_puzzles) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif daily_puzzles[0].expiration is None: # check if daily puzzles aexpiration date has been set
        raise HTTPException(status_code=404, detail="daily puzzles expired")

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
    
    db_daily = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()
        
    return db_daily

# update user daily puzzles
@app_v1.put("/users/{user_id}/daily_puzzles", tags=["Daily"])
async def update_daily_puzzles(user_id: str, puzzles: List[schemas.CreateDailyPuzzle], db: Session = Depends(get_db)):

    db_daily = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).first()

    if db_daily is None:
        return None

    for puzzle in puzzles:
        stmt = (update(models.DailyPuzzle).where(models.DailyPuzzle.owner_id == user_id).where(models.DailyPuzzle.location == puzzle.location).values(theme_id=puzzle.theme_id, title=puzzle.title, locked=puzzle.locked, completed=puzzle.completed, inserted_at=puzzle.inserted_at, expiration=puzzle.expiration, alt_id=puzzle.alt_id, alt_title=puzzle.alt_title))
        db.execute(stmt)
        db.commit()
    
    db_daily = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()

    
    return db_daily

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
    

### ACHIEVEMENTS

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
    return db_achievement

# get all user achievements
@app_v1.get('/achievements/{user_id}', response_model=List[schemas.Achievement], tags=["Achievements"])
async def get_achievements(user_id: str, db: Session = Depends(get_db), limit: int = 20):
    achievements = db.query(models.Achievement).filter(models.Achievement.owner_id == user_id).order_by(models.Achievement.id.desc()).limit(limit).all()
    
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
async def get_opening(user_id: str, opening_id: int, db: Session = Depends(get_db)):
    opening = db.query(models.Opening).filter(models.Opening.owner_id == user_id).filter(models.Opening.opening_id == opening_id).one_or_none()
    if opening is None:
        raise HTTPException(status_code=404, detail="opening not found")
    else: 
        return opening

# create user opening 
@app_v1.post('/openings/{user_id}/{opening_id}', response_model=schemas.Opening, tags=["Openings"])
async def add_opening(user_id: str, opening_id: int, opening: schemas.OpeningCreate, db: Session = Depends(get_db)):
    # db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    # if db_user is None:
    #      return None
    
    db_opening= models.Opening(**opening.dict(), owner_id = user_id)
    db.add(db_opening)
    db.commit()
    db.refresh(db_opening)
    opening = db.query(models.Opening).filter(models.Opening.owner_id == user_id).filter(models.Opening.opening_id == opening_id).one_or_none()

    return opening

# update user opening data
@app_v1.put('/openings/{user_id}/{opening_id}', tags=["Openings"])
async def update_opening(user_id: str, opening_id: int, opening: schemas.Opening, db: Session = Depends(get_db)):

    db_opening= db.query(models.Opening).filter(models.Opening.owner_id == user_id).filter(models.Opening.opening_id == opening_id).one_or_none()
    
    if db_opening is None:
        return None
    
    stmt = (update(models.Opening).where(models.Opening.owner_id == user_id).where(models.Opening.opening_id == opening.opening_id).values(**opening.dict()))
    db.execute(stmt)
    db.commit()
    db.refresh(db_opening)
    return db_opening


## LEADERBOARD

# get user leaderboard data
@app_v1.get('/leaderboard/{leaderboard_id}', tags=["Leaderboard"])
async def get_leaderboard(leaderboard_id: str, limit: int = 100, skip: int = 0, db: Session = Depends(get_db)):
    #users = db.query(models.User).offset(skip).limit(limit).all()
    users = db.query(models.User).order_by(models.User.total_score.desc()).limit(limit).all() # select * from users order by score desc limit 100
    leaderboard = []
    if users is None:
        return 'leaderboard not found'
    else:
        for user in users:
            leaderboard.append(schemas.LeaderboardUser(user_id=user.user_id, user_name=user.user_name, total_score=user.total_score))
        
        # return leaderboard sans user_id
        public_leaderboard = []
        for user in leaderboard:
            if user.total_score > 0: # user must have played at least one game
                delattr(user, 'user_id')
                public_leaderboard.append(user)
        
        return public_leaderboard


## Username

#check if username exists
@app_v1.get('/users/username/{user_name}',tags=["Login"])
async def check_username(user_name: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_name == user_name).one_or_none()
    if user is None:
        return 'username is available'
    else: 
        return  'username already exists'

@app_v1.post('/users/username/{user_id}/{user_name}',tags=["Login"])
async def add_username(user_name: str, user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_name == user_name).one_or_none()
    if user is None:
        user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()
        if user is None:
            return 'user not found'
        else:
            user.user_name = user_name
            db.commit()
            db.refresh(user)
            return 'username successfully updated'
    else: 
        return  'username already exists'