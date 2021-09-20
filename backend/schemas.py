
from pydantic import BaseModel
from typing import Optional, List

from sqlalchemy.engine import interfaces

# Theme Schemas
class Theme(BaseModel):
    id: int
    owner_id: str
    title: str
    category: str
    rating: Optional[int] = 1500
    completed: Optional[int] = 0
    high_score: Optional[int] = 0
    score_history: str

    class Config:
        orm_mode=True

class CreateTheme(BaseModel):
    title: str
    category: str
    rating: Optional[int] = 1500
    completed: Optional[int] = 0
    high_score: Optional[int] = 0
    score_history: str

    class Config:
        orm_mode=True

# Daily Puzzle Schemas
class CreateDailyPuzzle(BaseModel):
    location: int
    theme_id: int
    title: str
    completed: bool
    locked: bool
    inserted_at: str

    class Config:
        orm_mode=True

class DailyPuzzle(BaseModel):
    id: int
    location: int
    theme_id: int
    title: str
    completed: bool
    locked: bool
    inserted_at: str
    owner_id: str

    class Config:
        orm_mode=True


# Puzzle schema

class Puzzle(BaseModel):
    puzzle_id: str
    fen: str
    moves: str
    themes: str
    class Config:
        orm_mode = True

# Achievement schemas
class AchievementCreate(BaseModel):
    inserted_at: str
    category: str
    value: str
    theme: str

class Achievement(BaseModel):
    id: int
    owner_id: str
    inserted_at: str
    category: str
    value: str
    theme: str
    class Config:
        orm_mode = True
# User schemas

class UserBase(BaseModel):
    pass
    
class UserCreate(UserBase):
    user_id: str
    overall_rating: int
    inserted_at: str

class User(UserBase):
    id: int
    overall_rating: Optional[int] = 1200
    themes: Optional[List[Theme]] = []
    daily_puzzles: Optional[List[DailyPuzzle]] = []

    class Config:
        orm_mode=True

