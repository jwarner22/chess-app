from enum import unique
from typing import Sequence
import uuid
from pydantic.types import UUID1
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, false
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base, LocalBase, LocalBaseOpenings

class Puzzles(LocalBase):
    __tablename__ = "labels_raw"
    puzzle_id = Column(String, primary_key=True, index=True)
    fen = Column(String, unique=False, index=False)
    moves = Column(String, unique=False, index=False)
    rating = Column(Integer, unique=False, index=True)
    rating_dev = Column(Integer, unique=False, index=False)
    rating_dev2 = Column(Integer, unique=False, index=False)
    nb_plays = Column(Integer, unique=False, index=False)
    themes = Column(String, unique=False, index=True)
    game_url = Column(String, unique=False, index=False)
    class Congif:
        orm_mode = True

class Theme(Base):
    __tablename__ = "themes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique = False, index=True)
    category = Column(String, index=False)
    completed = Column(Integer, index=False)
    rating = Column(Integer, index=False)
    high_score = Column(Integer, index=False)
    high_rating = Column(Integer, index=False)
    score_history = Column(String, index=False)
    owner_id = Column(String, ForeignKey("user.user_id"))
    
    #owner = relationship("User", back_populates="themes")

class DailyPuzzle(Base):
    __tablename__ = 'daily_puzzles'
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(Integer, unique=False, index=False)
    inserted_at = Column(String, unique=False, index=False)
    theme_id = Column(Integer, unique = False, index=False)
    title = Column(String, unique=False,index=False)
    completed = Column(Boolean, unique=False,index=False)
    locked = Column(Boolean, unique=False, index=False)
    expiration = Column(String, unique=False, index=False)
    alt_id = Column(Integer, unique=False, index=False)
    alt_title = Column(String, unique=False, index=False)
    owner_id = Column(String, ForeignKey("user.user_id"))
    

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    inserted_at = Column(Float, unique=False, index=False)
    category = Column(String, unique=False, index=False)
    value = Column(Integer, unique=False, index=False)
    theme = Column(String, unique=False, index=False)
    diff = Column(Integer, unique=False, index=False)
    owner_id = Column(String, ForeignKey("user.user_id"))


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String,unique=True, index=True)
    overall_rating = Column(Integer,unique=False, index=False)
    inserted_at = Column(String, unique=False, index=False)
    total_score = Column(Integer, unique=False, index=True)
    puzzles_completed = Column(Integer, unique=False, index=False)
    puzzles_correct = Column(Integer, unique=False, index=False)
    initial_rating = Column(Integer, unique=False, index=False)
    user_name = Column(String, unique=False, index=False)
    daily_streak = Column(Integer, unique=False, index=False)
    last_daily = Column(Integer, unique=False, index=False)

    themes =  relationship("Theme", backref="user")
    daily_puzzles = relationship("DailyPuzzle", backref="user")
    achievements = relationship("Achievement", backref="user")
    openings = relationship("Opening", backref="user")
    #themes = relationship("Theme", back_populates='owner')

    class Congif:
        orm_mode = True

class Opening(Base):
    __tablename__ = "opening"

    id = Column(Integer, primary_key=True, index=True)
    opening_id = Column(Integer, unique = False, index=True)
    opening_name = Column(String, unique=False, index=False)
    completed = Column(Integer, index=False)
    high_score = Column(Integer, index=False)
    score_history = Column(String, index=False)
    owner_id = Column(String, ForeignKey("user.user_id"))

    class Congif:
        orm_mode = True

class OpeningCompletions(Base):
    __tablename__ = "opening_completions"
    
    id = Column(Integer, primary_key=True, index=True)
    opening_id = Column(Integer, unique = False, index=True)
    completions = Column(Integer, unique=False, index=False)
    history_1 = Column(Integer, unique=False, index=False)
    history_2 = Column(Integer, unique=False, index=False)
    history_3 = Column(Integer, unique=False, index=False)
    history_4 = Column(Integer, unique=False, index=False)
    history_5 = Column(Integer, unique=False, index=False)
    history_6 = Column(Integer, unique=False, index=False)
    history_7 = Column(Integer, unique=False, index=False)
    owner_id = Column(String, ForeignKey("user.user_id"))

# class ThemeRating(Base):
#     __tablename__ = "theme_ratings"

#     id = Column(Integer, primary_key=True, index=True)
#     user_rating = Column(Integer, unique=False, index=True)
#     title = Column(String, unique=False, index=True)
#     rating = Column(Float, index=True, unique=False)
#     failure = Column(Boolean, index=True, unique=False)
#     isDaily = Column(Boolean, index=True, unique=False)
#     perfect = Column(Boolean, index=True, unique=False)
#     score = Column(Integer, index=True, unique=False)
#     category = Column(String, index=True, unique=False)
#     completed = Column(Integer, index=True, unique=False)
#     theme_id = Column(Integer, index=True, unique=False)
#     rating = Column(Integer, index=True, unique=False)
#     high_score = Column(Integer, index=True, unique=False)
#     high_rating = Column(Integer, index=True, unique=False)
#     score_history = Column(String, index=True, unique=False)
#     inserted_at = Column(Integer, index=True, unique=False)

#     owner_id = Column(String, ForeignKey("user.user_id"))

# class OpeningRating(Base):
#     __tablename__ = "opening_ratings"

#     id = Column(Integer, primary_key=True, index=True)
#     opening_id = Column(Integer, unique=False, index=True)
#     rating = Column(Float, index=True, unique=False)
#     user_id = Column(String, unique=False, index=True)
#     user_opening_rating = Column(Integer, unique=False, index=True)
#     user_score = Column(Integer, unique=False)

class Openings(LocalBaseOpenings):
    __tablename__ = "openings"

    id = Column(Integer, primary_key=True, index=True)
    eco = Column(String, unique=False, index=False)
    name = Column(String, unique=False, index=False)
    pgn = Column(String, unique=False, index=False)
    uci = Column(String, unique=False, index=True)
    epd = Column(String, unique=False, index=False)
    np_lichess = Column(Integer, unique=False, index=True)
    np_master = Column(Integer, unique=False, index=True)
    child_ids = Column(String, unique=False, index=False)
    parent_ids = Column(String, unique=False, index=False)

# class OpeningQueryRecord(LocalBaseOpenings):
#     __tablename__ = "opening_query_record"

#     id = Column(Integer, primary_key=True, index=True)
#     moves = Column(String, unique=True, index=True)
    
    
