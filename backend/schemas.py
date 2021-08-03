from pydantic import BaseModel
from typing import Optional


#class UserInfo(BaseModel):
#    email: 'str'
#    lichess_usn: Optional['str']
#    chesscom_usn: Optional['str']
#
#class UserCreate(BaseModel):

class Puzzle(BaseModel):
    puzzle_id: str
    fen: str
    moves: str
    themes: str
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    user_id: int

class User(BaseModel):
    id: int
    user_id: int
    class Config:
        orm_mode=True