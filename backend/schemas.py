
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
    high_rating: Optional[int] = 800
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
    expiration: str
    alt_id: Optional[int] = None
    alt_title: Optional[str] = None

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
    expiration: str
    owner_id: str
    alt_id: Optional[int] = None
    alt_title: Optional[str] = None

    class Config:
        orm_mode=True

class DailyPicks(BaseModel):
    picks: List[int]
    alts: List[int]

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
    inserted_at: float
    category: str
    value: int
    diff: Optional[int] = 0
    theme: str

class Achievement(BaseModel):
    id: int
    owner_id: str
    inserted_at: float
    category: str
    diff: Optional[int]
    value: int
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
    total_score: Optional[int] = 0
    puzzles_completed: Optional[int] = 0
    puzzles_correct: Optional[int] = 0
    initial_rating: Optional[int] = 800
    daily_streak: Optional[int] = 0
    last_daily: Optional[str]


class UserProfile(UserBase):
    user_id: str
    overall_rating: int
    inserted_at: str
    total_score: Optional[int] = 0
    puzzles_completed: Optional[int] = 0
    puzzles_correct: Optional[int] = 0
    initial_rating: int
    user_name: Optional[str] = None
    daily_streak: Optional[int] = 0
    last_daily: Optional[int]

    class Config:
        orm_mode=True

class User(UserBase):
    id: int
    overall_rating: Optional[int] = 1200
    total_score: int
    puzzles_completed: Optional[int] = 0
    puzzles_correct: Optional[int] = 0
    initial_rating: int
    user_name: Optional[str] = None
    daily_streak: Optional[int] = 0
    last_daily: Optional[int]
    themes: Optional[List[Theme]] = []
    daily_puzzles: Optional[List[DailyPuzzle]] = []
    achievements: Optional[List[Achievement]] = []

    class Config:
        orm_mode=True

class Opening(BaseModel):
    id: int
    opening_id: str
    opening_name: str
    completed: Optional[int] = 0
    high_score: Optional[int] = 0
    score_history: Optional[str] = ""
    owner_id: str

    class Config:
        orm_mode=True

class OpeningCreate(BaseModel):
    opening_id: str
    opening_name: str
    completed: Optional[int] = 0
    high_score: Optional[int] = 0
    score_history: Optional[str] = ""

    class Config:
        orm_mode=True

class LeaderboardUser(BaseModel):
    user_id: str
    user_name: Optional[str] = None
    total_score: int

class ThemeRating(BaseModel):
    user_rating: int
    title: str
    rating: float
    failure: bool
    isDaily: bool
    perfect: bool
    score: int
    category: str
    completed: int
    theme_id: int
    rating: int
    high_score: int
    high_rating: int
    score_history: str
    owner_id: str
    inserted_at: int

    class Config:
        orm_mode=True

class OpeningRating(BaseModel):
    opening_id: int
    rating: float
    user_id: str
    user_opening_rating: int
    user_score: int

    class Config:
        orm_mode=True