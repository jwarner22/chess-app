from fastapi import FastAPI, Depends, HTTPException

import uvicorn
from typing import Optional

# import models
from sqlalchemy.orm import Session

# from .schemas import UserInfo, Puzzle
import models
from database import engine, SessionLocal
from read_puzzles import get_puzzle, get_puzzles
from database import engine

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

@app.get('/puzzle/')
def read_puzzle(puzzle_id: str, db: Session = Depends(get_db)): #, elo: Optional[str]=None):
   puzzle = get_puzzle(db,puzzle_id)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle

@app.get('/puzzles/')
def read_puzzles(rating: int, theme: str, db: Session = Depends(get_db)): # changed from read puzzle to read puzzles
   puzzle = get_puzzles(db,rating, theme)
   if puzzle is None:
       raise HTTPException(status_code=404, detail='puzzle not found')
   return puzzle


if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000)