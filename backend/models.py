from enum import unique
from typing import Sequence
import uuid
from pydantic.types import UUID1
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base, LocalBase, LocalBaseOpenings

class Puzzles(LocalBase):
    __tablename__ = "labels_raw"
    puzzle_id = Column(String, primary_key=True, index=True)
    fen = Column(String, unique=False, index=True)
    moves = Column(String, unique=False, index=True)
    rating = Column(Integer, unique=False, index=True)
    rating_dev = Column(Integer, unique=False, index=True)
    rating_dev2 = Column(Integer, unique=False, index=True)
    nb_plays = Column(Integer, unique=False, index=True)
    themes = Column(String, unique=False, index=True)
    game_url = Column(String, unique=False, index=True)


class Theme(Base):
    __tablename__ = "themes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique = False, index=True)
    category = Column(String, index=True)
    completed = Column(Integer, index=True)
    rating = Column(Integer, index=True)
    high_score = Column(Integer, index=True)
    high_rating = Column(Integer, index=True)
    score_history = Column(String, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))
    
    #owner = relationship("User", back_populates="themes")

class DailyPuzzle(Base):
    __tablename__ = 'daily_puzzles'
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(Integer, unique=False, index=True)
    inserted_at = Column(String, unique=False, index=True)
    theme_id = Column(Integer, unique = False, index=True)
    title = Column(String, unique=False,index=True)
    completed = Column(Boolean, unique=False,index=True)
    locked = Column(Boolean, unique=False, index=True)
    expiration = Column(String, unique=False, index=True)
    alt_id = Column(Integer, unique=False, index=True)
    alt_title = Column(String, unique=False, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))
    

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    inserted_at = Column(Float, unique=False, index=True)
    category = Column(String, unique=False, index=True)
    value = Column(Integer, unique=False, index=True)
    theme = Column(String, unique=False, index=True)
    diff = Column(Integer, unique=False, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String,unique=True, index=True)
    overall_rating = Column(Integer,unique=False, index=True)
    inserted_at = Column(String, unique=False, index=True)
    total_score = Column(Integer, unique=False, index=True)
    puzzles_completed = Column(Integer, unique=False, index=True)
    puzzles_correct = Column(Integer, unique=False, index=True)
    initial_rating = Column(Integer, unique=False, index=False)
    user_name = Column(String, unique=False, index=True)
    daily_streak = Column(Integer, unique=False, index=True)
    last_daily = Column(Integer, unique=False, index=True)

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
    opening_name = Column(String, unique=False, index=True)
    completed = Column(Integer, index=True)
    high_score = Column(Integer, index=True)
    score_history = Column(String, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))

    class Congif:
        orm_mode = True

class ThemeRating(Base):
    __tablename__ = "theme_ratings"

    id = Column(Integer, primary_key=True, index=True)
    user_rating = Column(Integer, unique=False, index=True)
    title = Column(String, unique=False, index=True)
    rating = Column(Float, index=True, unique=False)
    failure = Column(Boolean, index=True, unique=False)
    isDaily = Column(Boolean, index=True, unique=False)
    perfect = Column(Boolean, index=True, unique=False)
    score = Column(Integer, index=True, unique=False)
    category = Column(String, index=True, unique=False)
    completed = Column(Integer, index=True, unique=False)
    theme_id = Column(Integer, index=True, unique=False)
    rating = Column(Integer, index=True, unique=False)
    high_score = Column(Integer, index=True, unique=False)
    high_rating = Column(Integer, index=True, unique=False)
    score_history = Column(String, index=True, unique=False)
    inserted_at = Column(Integer, index=True, unique=False)

    owner_id = Column(String, ForeignKey("user.user_id"))

class OpeningRating(Base):
    __tablename__ = "opening_ratings"

    id = Column(Integer, primary_key=True, index=True)
    opening_id = Column(Integer, unique=False, index=True)
    rating = Column(Float, index=True, unique=False)
    user_id = Column(String, unique=False, index=True)
    user_opening_rating = Column(Integer, unique=False, index=True)
    user_score = Column(Integer, unique=False)

class Openings(LocalBaseOpenings):
    __tablename__ = "openings"

    id = Column(Integer, primary_key=True, index=True)
    eco = Column(String, unique=False, index=True)
    name = Column(String, unique=False, index=True)
    pgn = Column(String, unique=False, index=True)
    uci = Column(String, unique=False, index=True)
    epd = Column(String, unique=False, index=True)
    np_lichess = Column(Integer, unique=False, index=True)
    np_master = Column(Integer, unique=False, index=True)

class OpeningQueryRecord(LocalBaseOpenings):
    __tablename__ = "opening_query_record"

    id = Column(Integer, primary_key=True, index=True)
    moves = Column(String, unique=True, index=True)
    
    
