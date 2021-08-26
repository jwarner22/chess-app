from pydantic import BaseModel
from typing import Optional, List

from sqlalchemy.engine import interfaces


#class UserInfo(BaseModel):
#    email: 'str'
#    lichess_usn: Optional['str']
#    chesscom_usn: Optional['str']
#
#class UserCreate(BaseModel):

class Theme(BaseModel):
    id: int
    owner_id: str
    title: str
    category: str
    rating: Optional[int] = 1500
    completed: Optional[int] = 0
    high_score: Optional[int] = 0

    class Config:
        orm_mode=True

class CreateTheme(BaseModel):
    title: str
    category: str
    rating: Optional[int] = 1500
    completed: Optional[int] = 0
    high_score: Optional[int] = 0

    class Config:
        orm_mode=True

class DailyPuzzle(BaseModel):
    id: int
    location: int
    theme_id: int
    title: str
    completed: bool
    locked: bool
    owner_id: str

    class Config:
        orm_mode=True


class Puzzle(BaseModel):
    puzzle_id: str
    fen: str
    moves: str
    themes: str
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    pass
    
class UserCreate(UserBase):
    user_id: str
    overall_rating: int

class User(UserBase):
    id: int
    overall_rating: Optional[int] = 1200
    themes: Optional[List[Theme]] = []
    daily_puzzles: Optional[List[DailyPuzzle]] = []

    class Config:
        orm_mode=True

