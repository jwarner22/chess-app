from pydantic import BaseModel
from typing import Optional, List


#class UserInfo(BaseModel):
#    email: 'str'
#    lichess_usn: Optional['str']
#    chesscom_usn: Optional['str']
#
#class UserCreate(BaseModel):

class ThemeBase(BaseModel):
    title: str
    description: Optional[str] = None

class ThemeCreate(ThemeBase):
    pass

class Theme(ThemeBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class Puzzle(BaseModel):
    puzzle_id: str
    fen: str
    moves: str
    themes: str
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    user_id: int

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    user_id: int
    overall_rating: int
    themes: List[Theme] = []

    class Config:
        orm_mode=True