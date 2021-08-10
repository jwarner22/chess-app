from fastapi import FastAPI, Depends, HTTPException

import uvicorn
from typing import Optional, List

# import models
from sqlalchemy.orm import Session
from sqlalchemy import update

# from .schemas import UserInfo, Puzzle
import models
from database import engine, SessionLocal
from read_puzzles import get_puzzle, get_puzzles
from database import engine
import schemas
import crud

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middelware to allow http requests
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



models.Base.metadata.create_all(engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# @app.post('/UserBase/user')
# def create_user(request: UserInfo):
#     return 'creating'

@app.get('/')
def read_root():
        return {'Hello': 'world'}


# fetch via /puzzles/?puzzle_id=...

# get a puzzle
@app.get('/puzzle/')
def read_puzzle(puzzle_id: str, db: Session = Depends(get_db)): #, elo: Optional[str]=None):
   puzzle = get_puzzle(db,puzzle_id)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle

# get puzzles
@app.get('/puzzles/')
def read_puzzles(rating: int, theme: str, db: Session = Depends(get_db)): # changed from read puzzle to read puzzles
   puzzle = get_puzzles(db,rating, theme)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle

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

# initialize theme ratings
@app.post('/users/{user_id}/themes/', response_model=schemas.Theme)
def define_theme_ratings(user_id: str, theme: schemas.CreateTheme, db: Session = Depends(get_db)):
    theme_ratings = crud.add_theme(db, theme = theme, user_id = user_id)#title = theme.title, category = theme.category)
    return theme_ratings

# update user theme rating
@app.put("/users/themes/{user_id}", response_model = schemas.User)
async def update_theme_rating(user_id: str, theme: schemas.Theme, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.user_id == user_id).one_or_none()
    #db_theme = db_user.themes.filter(db_user.themes.title == theme.title)
    #db_theme = [entry for entry in db_user.themes if entry.title == theme.title]
    if db_user is None:
         return None
    #db_user.themes.update(theme.dict())
    # for var, value in vars(schemas.Theme).items():
    #for var, value in vars(theme).items():
    #    setattr(db_theme, var, value) if value else None
    #     setattr(db_user.themes, var, value) if value else None
    # setattr(db_user, 'themes', db_theme)
    # db_user.themes = db_theme
    # #db_user.modified = modified_now
    db.add(db_user)
    stmt = (update(models.Theme).where(models.Theme.owner_id == user_id).where(models.Theme.title == theme.title).values(rating=theme.rating, completed=theme.completed, high_score=theme.high_score))
    db.execute(stmt)
    db.commit()
    db.refresh(db_user)
    return db_user


# # get a users theme ratings
# @app.get('/users/{user_id}/themes/', response_model= schemas.Theme)
# def get_theme_ratings(user_id: int, db: Session = Depends(get_db)):
#     # user_ratings = crud.get_user_ratings(db, user_id = user_id)
#     db_user = crud.get_user_by_id(db, user_id=user_id)
#     return db_user.themes # user_ratings

# get 100 ratings (testing)
@app.get('/users/themes/', response_model=List[schemas.Theme])
def read_ratings(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    ratings = crud.get_all_ratings(db, skip=skip, limit=limit)
    return ratings

if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000)