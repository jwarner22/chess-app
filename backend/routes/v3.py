
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
from sqlalchemy import Integer, cast, null, update, insert, delete
import ast 
import models
from database import engine_local,engine_remote, engine_local_openings, SessionLocal, SessionRemote, SessionLocalOpenings
from read_puzzles import get_puzzles
import schemas
import crud
import time

from fastapi.middleware.cors import CORSMiddleware

from random import randint, choices

app_v3 = APIRouter()

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



## OPENING DATA

# get opening stats for user
@app_v3.get('/opening-stats/{user_id}', tags=["Openings"])
async def get_opening_stats(user_id: str, db: Session = Depends(get_db), db_openings: Session = Depends(get_local_opening_db)):
    user_openings = db.query(models.OpeningCompletions).filter_by(owner_id=user_id).all()

    openings_data = db_openings.query(models.Openings).filter(models.Openings.id.in_([opening.opening_id for opening in user_openings])).all()
    
    response = []
    for opening in user_openings:
        data = next(filter(lambda x: x.id == opening.opening_id, openings_data))
        merged = dict()
        merged.update(data.__dict__)
        merged.update(opening.__dict__)

        response.append(merged)

    return response

# get top 3 child openings and create user data
@app_v3.post('/openings-data/top-3/{user_id}/{opening_id}', tags=["Openings"])
async def get_top3_openings_data(user_id: str, opening_id: str, db: Session = Depends(get_db), db_openings: Session = Depends(get_local_opening_db)):
    # get opening from local db
    opening = db_openings.query(models.Openings).filter(models.Openings.id == opening_id).all()
    child_ids = opening[0].child_ids
    if (child_ids is None or child_ids == ''):
        return {"message": "no child openings"}

    # get child openings from local db
    child_openings = db_openings.query(models.Openings).filter(models.Openings.id.in_([int(x) for x in child_ids.split(',')])).all()
    # filter child openings where np_lichess is not null
    child_openings = list(filter(lambda x: x.np_lichess is not None, child_openings))
    #filter child openings where uci length is even
    child_openings = list(filter(lambda x: len(x.uci) % 2 != 0, child_openings))
    # sort child openings by np_lichess and return top 3
    child_openings = sorted(child_openings, key=lambda x: x.np_lichess, reverse=True)
    child_openings = child_openings[:3]

    # create user openingCompletions data from child openings
    user_openings = []
    for child_opening in child_openings:
        user_opening = models.OpeningCompletions(
            opening_id=child_opening.id,
            owner_id=user_id,
            completions=0,
            history_1=0,
            history_2=0,
            history_3=0,
            history_4=0,
            history_5=0,
            history_6=0,
            history_7=0,
            favorite=False
        )

        # check if user opening exists
        user_opening_exists = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.opening_id == child_opening.id, models.OpeningCompletions.owner_id == user_id).all()
        if (len(user_opening_exists) == 0):
            db.add(user_opening)
            db.commit()
            #print('user opening created:' + ' ' + str(user_opening.opening_id))

        obj = {
            "id": user_opening.id,
            "opening_id": user_opening.opening_id,
            "owner_id": user_opening.owner_id,
            "completions": user_opening.completions,
            "history_1": user_opening.history_1,
            "history_2": user_opening.history_2,
            "history_3": user_opening.history_3,
            "history_4": user_opening.history_4,
            "history_5": user_opening.history_5,
            "history_6": user_opening.history_6,
            "history_7": user_opening.history_7,
            "np_lichess": child_opening.np_lichess,
            "np_master": child_opening.np_master,
            "favorite": user_opening.favorite,
            "pgn": child_opening.pgn,
            "eco": child_opening.eco,
            "epd": child_opening.epd,
            "child_ids": child_opening.child_ids,
            "parent_ids": child_opening.parent_ids,
            "name": child_opening.name
        }
        user_openings.append(obj) 

    return user_openings

# get opening favorite
@app_v3.get('/user/{user_id}/opening/{opening_id}/favorites', tags=["Openings"])
async def get_opening_favorite(user_id: str, opening_id: str, db: Session = Depends(get_db)):
    # get opening from db
    opening = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.opening_id == opening_id, models.OpeningCompletions.owner_id == user_id).all()
    if (len(opening) == 0):
        return {"message": "no opening found"}
    favorite = opening[0].favorite
    return {"favorite": favorite}

#update opening favorite
@app_v3.put('/user/{user_id}/opening/{opening_id}/favorites', tags=["Openings"])
async def update_opening_favorite(user_id: str, opening_id: int, favorite: bool, db: Session = Depends(get_db)):
    # get user opening
    user_opening = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.opening_id == opening_id, models.OpeningCompletions.owner_id == user_id).first()
    if (user_opening is None):
        return {"message": "user opening not found"}

    user_opening.favorite = favorite
    db.commit()
    print('user opening favorite updated:' + ' ' + str(user_opening.opening_id))

    return {"message": "successful"}

# # get single opening for ui
@app_v3.get('/opening-data/', response_model=schemas.OpeningData, tags=["Openings"]) # get opening data
async def get_opening_data(moves: str, db: Session = Depends(get_local_opening_db)):
    opening = db.query(models.Openings).filter(models.Openings.uci==moves).first()
    return opening

# add new opening data for user
@app_v3.post('/openings-data/new/{user_id}/{opening_id}', tags=["Openings"]) # add new opening data')
async def add_new_opening_data(user_id: str, opening_id: int, db: Session = Depends(get_db), db_openings: Session = Depends(get_local_opening_db)):
    # get opening id
    opening = db_openings.query(models.Openings).filter(models.Openings.id==opening_id).first()
    if (opening is None):
        return 'opening not found'

    # check if user already has opening
    user_opening = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id==user_id).filter(models.OpeningCompletions.opening_id==opening_id).first()
    if (user_opening is not None):
        return 'user already has opening'

    # add opening to user
    user_opening = models.OpeningCompletions(
        owner_id=user_id,
        opening_id=opening.id,
        completions=0,
        history_1=0,
        history_2=0,
        history_3=0,
        history_4=0,
        history_5=0,
        history_6=0,
        history_7=0,
        favorite=False
    )
    db.add(user_opening)
    db.commit()
    db.refresh(user_opening)

    return {"user_opening": user_opening, "opening": opening}


# get child openings
@app_v3.post('/openings-data/children', response_model=List[schemas.OpeningData], tags=["Openings"]) # get child openings
async def get_child_openings(body: schemas.ChildOpeningsRequest, db: Session = Depends(get_local_opening_db)):
    opening_ids = body.opening_ids.split(',')
    child_openings = db.query(models.Openings).filter(models.Openings.id.in_(opening_ids)).all()
    
    child_openings = list(filter(lambda x: x.np_lichess is not None, child_openings))
    #filter child openings where uci length is even
    child_openings = list(filter(lambda x: len(x.uci) % 2 != 0, child_openings))
    # sort child openings by np_lichess and return top 3
    child_openings = sorted(child_openings, key=lambda x: x.np_lichess, reverse=True)
    # return top 24
    child_openings = child_openings[:16]

    return child_openings

# update opening completions
@app_v3.put('/opening-completions/{user_id}/{opening_id}', tags=["Openings"]) # update opening data for user
async def update_opening_data(user_id: str, opening_id: int, db: Session = Depends(get_db), db_openings: Session = Depends(get_local_opening_db)):
    user_opening = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id == opening_id).first()
    
    if user_opening is None:
        raise HTTPException(status_code=404, detail="Opening not found")
    
    this_opening = db_openings.query(models.Openings).filter(models.Openings.id == opening_id).first()
    
    mastery_diff = 3*round((len(this_opening.uci)+1)/10) 
    #mastery = user_opening.history_7 + mastery_diff # calculate mastery as number completed * deth of opening
    setattr(user_opening, 'completions', user_opening.completions + 1) # increment completion count
    setattr(user_opening, 'history_1', user_opening.history_2) # shift history
    setattr(user_opening, 'history_2', user_opening.history_3)
    setattr(user_opening, 'history_3', user_opening.history_4)
    setattr(user_opening, 'history_4', user_opening.history_5)
    setattr(user_opening, 'history_5', user_opening.history_6)
    setattr(user_opening, 'history_6', user_opening.history_7)
    setattr(user_opening, 'history_7', user_opening.history_7 + mastery_diff) # update history

    db.commit()
    db.refresh(user_opening)

    parent_ids = this_opening.parent_ids.split(',')
    # get parent openings from local db
    parent_openings = db_openings.query(models.Openings).filter(models.Openings.id.in_(parent_ids)).all()
    #filter parent openings with no np_lichess
    parent_openings = list(filter(lambda x: x.np_lichess is not None, parent_openings))
    #filter child openings where uci length is even (only full moves b&w)
    parent_openings = list(filter(lambda x: len(x.uci) % 2 != 0, parent_openings))
    
    parent_ids = []
    for opening in parent_openings:
        parent_ids.append(opening.id)

    # query all user_openings in db that match parent_ids and update completions and history
    user_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id.in_(parent_ids)).all()
    for opening in user_openings:
        # mastery = opening.history_7 + mastery_diff
        setattr(opening, 'completions', opening.completions + 1) # increment completion count
        setattr(opening, 'history_1', opening.history_2) # shift history
        setattr(opening, 'history_2', opening.history_3)
        setattr(opening, 'history_3', opening.history_4)
        setattr(opening, 'history_4', opening.history_5)
        setattr(opening, 'history_5', opening.history_6)
        setattr(opening, 'history_6', opening.history_7)
        setattr(opening, 'history_7', opening.history_7 + mastery_diff) # update history
        db.commit()
        db.refresh(opening)
    
    # fetch fresh data from db
    user_opening = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id == opening_id).first()
    user_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id.in_(parent_ids)).all()


    return {"this_opening": user_opening, "parent_openings": user_openings}


## PUZZLES

# get single puzzle 
@app_v3.get('/puzzle/{theme}/{rating}', tags=["Puzzles"])
async def read_puzzle(rating: int, theme: str, limit: int = 5, db: Session = Depends(get_local_db)):
    upperBound = rating + 50
    lowerBound = rating - 50
    
    puzzle = []
    i=1
    while (len(puzzle) == 0) and (upperBound < 3000 or lowerBound > 0):
        # puzzle = db.query(models.Puzzles).filter(models.Puzzles.themes.contains(theme)).filter(models.Puzzles.rating >= lowerBound).filter(models.Puzzles.rating <= upperBound).limit(3).all()
        if theme == "mix":
            puzzle = db.query(models.Puzzles).filter(cast(models.Puzzles.rating, Integer) >= lowerBound).filter(cast(models.Puzzles.rating, Integer) <= upperBound).limit(limit).all()
        else:
            puzzle = db.query(models.Puzzles).filter(models.Puzzles.themes.contains(theme)).filter(cast(models.Puzzles.rating, Integer) >= lowerBound).filter(cast(models.Puzzles.rating, Integer) <= upperBound).limit(limit).all()
        upperBound += 100
        lowerBound -= 100
        if lowerBound < 0:
            lowerBound = 0
        i+=1
        
    return puzzle

## USER

# create user
@app_v3.post('/users', tags=["User"])
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user.user_id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    db_user = crud.create_user(db, user=user)
    return {'user created'}

# get user profile
@app_v3.get('/users/{user_id}', response_model=schemas.UserProfile, tags=["User"])
async def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# get all user data
@app_v3.get('/users/{user_id}/all', response_model=schemas.User, tags=["User"])
async def read_user_all(user_id: str, db: Session=Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()
    #print(db_user)
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# update user
@app_v3.put('/users/{user_id}', response_model=schemas.UserProfile, tags=["User"])
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
@app_v3.get('/users/{user_id}/initial-rating')
async def get_user_initial_rating(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    return {db_user.initial_rating}

## THEMES

# get theme
@app_v3.get('/users/{user_id}/themes/{theme_title}', response_model=schemas.Theme, tags=["Themes"])
async def return_theme_rating(user_id: str, theme_title: str, db: Session = Depends(get_db)):
    theme_response = db.query(models.Theme).filter(models.Theme.title == theme_title, models.Theme.owner_id==user_id).one_or_none()
    if theme_response is None:
        raise HTTPException(status_code=404, detail="Theme not found")
    #crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_response

# get themes
@app_v3.get('/users/{user_id}/themes', response_model=List[schemas.Theme], tags=["Themes"])
async def return_all_themes(user_id: str, db: Session = Depends(get_db)):
    themes = db.query(models.Theme).filter(models.Theme.owner_id == user_id).all()
    if themes is None:
        raise HTTPException(status_code=404, detail="Themes not found")
    return themes

# initialize theme
@app_v3.post('/users/{user_id}/themes', response_model=schemas.Theme, tags=["Themes"])
async def define_theme_ratings(user_id: str, theme: schemas.CreateTheme, db: Session = Depends(get_db)):
    theme_ratings = crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_ratings

# update theme
@app_v3.put("/users/{user_id}/themes", response_model = schemas.Theme, tags=["Themes"])
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
@app_v3.post("/users/{user_id}/themes/ratings/{rating}", tags=["Ratings"])
async def user_module_rating(user_id: str, theme_rating: schemas.ThemeRating, db: Session=Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()

    if db_user is None:
         return None
    
    db_rating = models.ThemeRating(**theme_rating.dict())
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)

    return {"rating posted"}

@app_v3.post("/users/{user_id}/openings/ratings/{rating}", tags=["Ratings"])
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
@app_v3.put('/users/{user_id}/daily_puzzles/picks', response_model=schemas.DailyPicks, tags=["Daily"])
async def get_daily_puzzle_picks(embedding: List[schemas.Embedding], user_id: str, db: Session = Depends(get_db), db_openings: Session = Depends(get_local_opening_db)):

    # generate daily puzzle module picks
    daily_puzzles = []
    excluded_ids = [] # exclude these moduless

    module_options = []
    for module in embedding:   
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

    # get user openings, filter by favorites
    user_openings_ids = []
    pick_opening_id = 0
    user_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.favorite == True).all()
    if (len(user_openings) == 0):
        #print('no favorites')
        #query user openings and sort by least completions, select all zero or one completions
        user_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).order_by(models.OpeningCompletions.completions.asc()).all()
        if len(user_openings) == 0:
            #print('no openings')
            # add new opening to database (default italian game)
            user_initial_opening = models.OpeningCompletions(owner_id = user_id, opening_id = 2226, completions = 0, favorite = False, history_1=0, history_2=0, history_3=0, history_4=0, history_5=0, history_6=0, history_7=0)
            db.add(user_initial_opening)
            db.commit()
            db.refresh(user_initial_opening)
            user_openings = [user_initial_opening]
        #select all user openings with zero or one completions
        user_openings_trunc = [x for x in user_openings if x.completions <= 1]
        if (len(user_openings_trunc) != 0):
            user_openings = user_openings_trunc

        # extract ids from user openings
        user_openings_ids = [x.opening_id for x in user_openings]
        pick_opening_id = choices(user_openings_ids)[0]

    else:
        #print('favorites')
        # select random favorite opening
        user_opening = choices(user_openings)[0]
        opening_id = int(user_opening.opening_id)

        # get opening from local opening db by user_opening.opening_id
        opening = db_openings.query(models.Openings).filter(models.Openings.id == opening_id).one_or_none()
        # get openings from local openings db

        child_ids = opening.child_ids.split(',')
        child_ids = [int(x) for x in child_ids]

        first_depth = 5
        #child_openings = db_openings.query(models.Openings).filter(models.Openings.id.in_(child_ids)).filter(models.Openings.completions == 0).order_by(models.Openings.uci_length.asc()).all()
        child_openings = db_openings.query(models.Openings).filter(models.Openings.id.in_(child_ids)).all()
        child_ids = [x.id for x in child_openings]

        truncated_child_openings = [x for x in child_openings if round(len(x.uci)/10) <= first_depth]
        # extract ids from child openings
        truncated_child_ids = [x.id for x in truncated_child_openings]
        
        # query user openings db for child openings with depth < first_depth and completed = 0
        user_child_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id.in_(truncated_child_ids)).filter(models.OpeningCompletions.completions == 0).all()
        
        if len(user_child_openings) == 0:
            #print('no child openings < first_depth')
            #query all child openings with completions = 0 and sort by uci length 
            user_child_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id.in_(child_ids)).filter(models.OpeningCompletions.completions == 0).all()
            # if all child openings have been completed, select all child openings and pick random opening
            if len(user_child_openings) == 0:
                #print('no child openings without completions')
                user_child_openings = db.query(models.OpeningCompletions).filter(models.OpeningCompletions.owner_id == user_id).filter(models.OpeningCompletions.opening_id.in_(child_ids)).all()
                user_child_openings_ids = [x.opening_id for x in user_child_openings]
                associated_openings = [x for x in child_openings if x.id in user_child_openings]
                
                associated_openings_trunc = [x for x in associated_openings if round(len(x.uci)/10) > first_depth]
                if len(associated_openings_trunc) != 0:
                    associated_openings = associated_openings_trunc # if there are openings with depth > first_depth, use those openings
                
                associated_openings_depth_ids = [x.id for x in associated_openings]
                # pick random opening from child_openings
                pick_opening_id = choices(associated_openings)[0]
            
            # sort user_child_openings by length descending
            #user_child_openings = sorted(user_child_openings, key=lambda x: len(x.uci), reverse=True)
            
            #max_length = round(len(child_openings[0].uci))
            user_child_openings_ids = [x.opening_id for x in user_child_openings]
            associated_openings = [x for x in child_openings if x.id in user_child_openings_ids]

            for i in range(first_depth, 20):
                # filter associated_openings by depth
                associated_openings_depth = [x for x in associated_openings if round(len(x.uci)/10) == i]
                # sort by np_lichess descending
                associated_openings_depth = sorted(associated_openings_depth, key=lambda x: x.np_lichess, reverse=True)
                # extract ids from associated_openings_depth while preserving order
                associated_openings_depth_ids = [x.id for x in associated_openings_depth]
                # get user_child_openings from user_child_openings where opening_id is in associated_openings_depth_ids
                user_child_openings_depth = [x for x in user_child_openings if x.opening_id in associated_openings_depth_ids]

                if len(user_child_openings_depth) > 0:
                    pick_opening_id = user_child_openings_depth[0].opening_id
                    break
            if (pick_opening_id == 0): # if no openings with depth > first_depth, pick random opening
                pick_opening_id = choices(user_child_openings_ids)[0]
        # sort user_child_openings by length descending
        user_child_openings_ids = [x.opening_id for x in user_child_openings]
        associated_openings = [x for x in truncated_child_openings if x.id in user_child_openings_ids]
        #print('associated_openings', associated_openings)
        for i in range(first_depth, 0, -1):
            #print(i)
            # filter associated_openings by depth
            associated_openings_depth = [x for x in associated_openings if round(len(x.uci)/10) == i]
            #print('associated_openings_depth', associated_openings_depth)
            # sort by np_lichess descending
            associated_openings_depth = sorted(associated_openings_depth, key=lambda x: x.np_lichess, reverse=True)
            #print('associated_openings_depth', associated_openings_depth)
            # extract ids from associated_openings_depth while preserving order
            associated_openings_depth_ids = [x.id for x in associated_openings_depth]
            #print(associated_openings_depth_ids)
            # get user_child_openings from user_child_openings where opening_id is in associated_openings_depth_ids
            user_child_openings_depth = [x for x in user_child_openings if x.opening_id in associated_openings_depth_ids]

            if len(user_child_openings_depth) > 0:
                #print('id found')
                pick_opening_id = user_child_openings_depth[0].opening_id
                break
    

    #print(pick_opening_id)
    picks.append(pick_opening_id) # adds opening to picks
    #print(picks)
    picks_response = {
        "picks": picks,
        "alts": alts
    }

    return picks_response

# get user's daily puzzles
@app_v3.get('/users/{user_id}/daily_puzzles', tags=["Daily"])
async def get_daily_puzzles(user_id: str, db: Session = Depends(get_db)):
    daily_puzzles = db.query(models.DailyPuzzle).filter(models.DailyPuzzle.owner_id == user_id).all()
    if daily_puzzles is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(daily_puzzles) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")

    return daily_puzzles

# testing...
@app_v3.get('/users/{user_id}/daily_modules', tags=["Daily"])
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
@app_v3.post('/users/{user_id}/daily_puzzles', tags=["Daily"])
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
@app_v3.put("/users/{user_id}/daily_puzzles", tags=["Daily"])
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
@app_v3.delete('/users/{user_id}/daily_puzzles', tags=["Daily"])
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
@app_v3.post('/achievements/{user_id}', tags=["Achievements"])
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
@app_v3.get('/achievements/{user_id}', response_model=List[schemas.Achievement], tags=["Achievements"])
async def get_achievements(user_id: str, db: Session = Depends(get_db), limit: int = 20):
    achievements = db.query(models.Achievement).filter(models.Achievement.owner_id == user_id).order_by(models.Achievement.id.desc()).limit(limit).all()
    
    return achievements

# get user daily achievements
@app_v3.get('/achievements/{user_id}/daily', response_model=List[schemas.Achievement], tags=["Achievements"])
async def get_achievements(user_id: str, db: Session = Depends(get_db)):
    achievements = db.query(models.Achievement).filter(models.Achievement.owner_id == user_id).filter(models.Achievement.inserted_at > ((time.time()*1000)-(3600*24*1000))).all() # daily: .filter(models.Achievement.inserted_at >= time.time() (but for today))
    if achievements is None:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    elif len(achievements) == 0:
        raise HTTPException(status_code=404, detail="daily puzzles not found")
    else: 
        return achievements

## LEADERBOARD

# get user leaderboard data
@app_v3.get('/leaderboard/{leaderboard_id}', tags=["Leaderboard"])
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
@app_v3.get('/users/username/{user_name}',tags=["Login"])
async def check_username(user_name: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_name == user_name).one_or_none()
    if user is None:
        return 'username is available'
    else: 
        return  'username already exists'

@app_v3.post('/users/username/{user_id}/{user_name}',tags=["Login"])
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
